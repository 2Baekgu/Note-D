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

/** At most this many paragraphs of summary. */
const MAX_BLOCKS = 3;

/** The Korean calendar day, which is the day the 9am Shortcut belongs to. */
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

/** The model is asked for one sentence per line, but it does not always
 *  oblige — and it likes to end a line with two trailing spaces, a markdown
 *  line break that is only stray whitespace in a chat room.
 *
 *  Returns the summary as two or three blocks. A wall of text is the thing
 *  that stops the message being read on a phone. */
function summaryBlocks(summary: string): string[] {
  const lines = summary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // It obliged: one thought per line already.
  const parts =
    lines.length > 1
      ? lines
      : // It did not: break the single line on sentence ends. The lookbehind
        // keeps the punctuation with the sentence it closes.
        (lines[0] ?? "").split(/(?<=[.!?])\s+/).filter(Boolean);

  if (parts.length <= MAX_BLOCKS) return parts;

  // More pieces than blocks: the tail joins the last one rather than being
  // dropped or left to sprawl.
  const head = parts.slice(0, MAX_BLOCKS - 1);
  return [...head, parts.slice(MAX_BLOCKS - 1).join(" ")];
}

export function buildMessage(article: DailyArticle, summary: string): string {
  return [
    "📚 오늘의 아티클",
    article.title,
    ...summaryBlocks(summary),
    articleUrl(article.slug),
    `✍️ ${article.author}`,
  ].join(BLOCK_GAP);
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
