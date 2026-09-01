/** Choosing the one article that goes to the study's open chat each morning,
 *  and writing the message around it. Kept out of the route so the rules can
 *  be exercised on their own. */

export interface DailyArticle {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  publishedAt: string;
  author: string;
  topics: string[];
}

/** Korea keeps no daylight saving, so a fixed offset is exact. */
const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;

/** How long an article rests before it may come round again. */
export const REST_DAYS = 30;

/** How long two pieces on the same subject stay apart.
 *
 *  The archive returns to the same ideas — that is what a study does — and
 *  the queue, left to publication order, was putting `기억의 방식은 UX를…`
 *  and `기억의 궁전…` on consecutive mornings. Two weeks is long enough that
 *  the second reads as a return rather than a repeat. */
export const KINSHIP_DAYS = 14;

/** A blank line between every block, so the message breathes on a phone. */
const BLOCK_GAP = "\n\n";

/** KakaoTalk folds anything longer behind a "장문" link, which nobody opens.
 *  Counted in UTF-16 units, which is never fewer than the characters a reader
 *  sees — erring short is the safe direction. */
export const MAX_MESSAGE_CHARS = 500;


/** The Korean calendar day, which is the day the 8am Shortcut belongs to. */
export function seoulDay(now: Date): string {
  return new Date(now.getTime() + SEOUL_OFFSET_MS).toISOString().slice(0, 10);
}

export function siteUrl(): string {
  const raw =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function articleUrl(slug: string): string {
  return `${siteUrl()}/articles/${encodeURIComponent(slug)}`;
}

/** The intro is the model's only job, and it is asked to hand back nothing
 *  but prose. It sometimes hands back more anyway — a title line it was told
 *  not to repeat, or the 📚 heading it was told the code owns. Strip those,
 *  so a stray line cannot end up doubled in the message.
 *
 *  Blank lines survive: they are the model's paragraph breaks, and they are
 *  what makes six sentences readable on a phone. Runs of them collapse to
 *  one, and trailing spaces go — the model ends lines with the two that mean
 *  a markdown line break and mean nothing at all in a chat room. */
function cleanIntro(intro: string, title: string): string {
  const heading = /^[📚🔗✍️]/u;
  const bareUrl = /^https?:\/\/\S+$/;

  const lines = intro
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== title && !heading.test(line) && !bareUrl.test(line));

  const kept: string[] = [];
  for (const line of lines) {
    // Drop a blank that opens the intro or follows another blank.
    if (!line && (kept.length === 0 || kept[kept.length - 1] === "")) continue;
    kept.push(line);
  }
  while (kept.length && kept[kept.length - 1] === "") kept.pop();

  return kept.join("\n");
}

export function buildMessage(article: DailyArticle, intro: string): string {
  return [
    "📚 오늘의 아티클",
    article.title,
    cleanIntro(intro, article.title),
    `🔗 ${articleUrl(article.slug)}`,
    `✍️ ${article.author}`,
    // An empty intro would otherwise open a hole of blank lines in the middle
    // of the message. Better a short card than a broken one.
  ].filter(Boolean).join(BLOCK_GAP);
}

/** How many characters the intro may use, once the heading, title, link and
 *  byline have taken theirs. An article with a Hangul slug spends far more on
 *  the percent-encoded link, so this is per article, not a constant. */
export function introBudget(article: DailyArticle): number {
  return Math.max(0, MAX_MESSAGE_CHARS - buildMessage(article, "").length);
}

/** The model is told the budget and usually respects it. This is what happens
 *  when it does not: drop whole paragraphs from the end, then sentences from
 *  the last one, so what survives still ends on a full stop. */
export function fitIntro(intro: string, budget: number): string {
  if (intro.length <= budget) return intro;

  const paragraphs = intro.split("\n\n");
  while (paragraphs.length > 1 && paragraphs.join("\n\n").length > budget) {
    paragraphs.pop();
  }
  if (paragraphs.join("\n\n").length <= budget) return paragraphs.join("\n\n");

  const sentences = paragraphs[paragraphs.length - 1].split(/(?<=[.!?])\s+/);
  while (sentences.length > 1) {
    sentences.pop();
    paragraphs[paragraphs.length - 1] = sentences.join(" ");
    const text = paragraphs.join("\n\n");
    if (text.length <= budget) return text;
  }

  // One sentence and still over: cut at the last space rather than mid-word.
  const hard = paragraphs.join("\n\n").slice(0, budget);
  const space = hard.lastIndexOf(" ");
  return (space > budget * 0.6 ? hard.slice(0, space) : hard).trimEnd();
}

/** Words that say what kind of piece this is rather than what it is about.
 *  Nearly every title here carries one, so matching on them would make every
 *  article kin to every other. */
const GENERIC = new Set([
  "효과", "법칙", "원리", "이론", "모형", "방법", "방식", "차이", "전환", "진화",
  "사용자", "디자인", "경험", "설계", "서비스", "화면", "인터페이스", "우리",
]);

/** Korean marks a word's role with a suffix, so the same word arrives spelled
 *  three ways. Dropping the common ones lets `기억의` meet `기억을`. */
const PARTICLE = /(?:은|는|이|가|을|를|의|에|도|로|과|와|만|부터|까지)$/;

/** What a title names its subject with. */
function keywords(title: string): Set<string> {
  const found = new Set<string>();
  for (const raw of title.toLowerCase().match(/[가-힣]+|[a-z]{4,}/g) ?? []) {
    const word = /[가-힣]/.test(raw) ? raw.replace(PARTICLE, "") : raw;
    if (word.length >= 2 && !GENERIC.has(word)) found.add(word);
  }
  return found;
}

/** Two articles are about the same thing when they share both a topic and a
 *  word naming their subject. Either alone is too loose: half the archive is
 *  filed under Cognitive Science, and a shared word with no shared topic is
 *  usually a coincidence of phrasing. */
function areKin(a: DailyArticle, b: DailyArticle): boolean {
  if (a.id === b.id) return false;
  if (!a.topics.some((t) => b.topics.includes(t))) return false;
  const theirs = keywords(b.title);
  for (const word of keywords(a.title)) if (theirs.has(word)) return true;
  return false;
}

/** Among articles nobody has seen yet, the newest goes first. That is what
 *  carries a just-published piece to the front of the queue on its own, with
 *  no special handling — swap the operands for oldest-first. */
const byNewestPublished = (a: DailyArticle, b: DailyArticle) =>
  b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id);

/**
 * The rules, in order:
 *   1. anything never sent — newest published first;
 *   2. otherwise whatever has rested longest, skipping the last 30 days,
 *      ties broken by the older publication date.
 *
 * `lastSent` maps article id to the ISO timestamp it last went out.
 */
export function pickDaily(
  articles: DailyArticle[],
  lastSent: Map<string, string>,
  now: Date = new Date(),
): DailyArticle | null {
  if (!articles.length) return null;

  const unsent = articles.filter((a) => !lastSent.has(a.id));

  let queue: DailyArticle[];
  if (unsent.length) {
    queue = [...unsent].sort(byNewestPublished);
  } else {
    const cutoff = new Date(now.getTime() - REST_DAYS * 86_400_000).toISOString();
    const rested = articles.filter((a) => (lastSent.get(a.id) ?? "") < cutoff);

    // Everything has gone out inside the window, i.e. there are fewer
    // articles than days. Sending nothing would be worse than sending the
    // oldest.
    queue = [...(rested.length ? rested : articles)].sort(
      (a, b) =>
        (lastSent.get(a.id) ?? "").localeCompare(lastSent.get(b.id) ?? "") ||
        a.publishedAt.localeCompare(b.publishedAt) ||
        a.id.localeCompare(b.id),
    );
  }

  // A date, so it compares cleanly against either shape a send is recorded
  // in — the day alone, or the full instant.
  const since = new Date(now.getTime() - KINSHIP_DAYS * 86_400_000)
    .toISOString()
    .slice(0, 10);
  const lately = articles.filter((a) => (lastSent.get(a.id) ?? "") >= since);

  // A preference, not a rule: if every candidate has a neighbour in the last
  // fortnight, the queue still moves rather than stalling on a technicality.
  return queue.find((a) => !lately.some((sent) => areKin(a, sent))) ?? queue[0];
}
