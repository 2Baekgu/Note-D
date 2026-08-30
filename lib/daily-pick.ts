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
}

/** Korea keeps no daylight saving, so a fixed offset is exact. */
const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;

/** How long an article rests before it may come round again. */
export const REST_DAYS = 30;

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
  if (unsent.length) return [...unsent].sort(byNewestPublished)[0];

  const cutoff = new Date(now.getTime() - REST_DAYS * 86_400_000).toISOString();
  const rested = articles.filter((a) => (lastSent.get(a.id) ?? "") < cutoff);

  // Everything has gone out inside the window, i.e. there are fewer articles
  // than days. Sending nothing would be worse than sending the oldest.
  const pool = rested.length ? rested : articles;

  return [...pool].sort(
    (a, b) =>
      (lastSent.get(a.id) ?? "").localeCompare(lastSent.get(b.id) ?? "") ||
      a.publishedAt.localeCompare(b.publishedAt) ||
      a.id.localeCompare(b.id),
  )[0];
}
