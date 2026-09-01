/** What tomorrow's message would say, without sending or recording it.
 *
 *  The same pick and the same prompt the cron uses — only the write to
 *  `daily_sends` is left out, so running this never costs the queue a day.
 */
import fs from "node:fs";
import { pickDaily, buildMessage, type DailyArticle } from "@/lib/daily-pick";
import { summarise } from "@/lib/summary";

const env: Record<string, string> = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
for (const [k, v] of Object.entries(env)) process.env[k] ??= v;

// The point of a preview is the message that will actually go out, so it uses
// the address the article will actually live at. Locally that variable points
// at the dev server, which would print a link nobody can open.
if (!process.env.SITE_URL) {
  const live = env.NEXT_PUBLIC_SITE_URL ?? "";
  process.env.SITE_URL = /localhost|127\.0\.0\.1/.test(live) || !live
    ? "https://note-d.co.kr"
    : live;
}
console.log(`사이트 주소: ${process.env.SITE_URL}\n`);

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const rows = await (
  await fetch(
    `${URL_BASE}/rest/v1/articles?select=id,title,slug,subtitle,content,topics,published_at,profiles(name)&status=eq.published`,
    { headers: H },
  )
).json();

const sent = await (
  await fetch(`${URL_BASE}/rest/v1/daily_sends?select=article_id,sent_on`, { headers: H })
).json();

const lastSent = new Map<string, string>();
for (const s of sent as { article_id: string; sent_on: string }[]) {
  const prev = lastSent.get(s.article_id);
  if (!prev || s.sent_on > prev) lastSent.set(s.article_id, s.sent_on);
}

const articles: DailyArticle[] = (rows as Record<string, unknown>[]).map((a) => ({
  id: String(a.id),
  title: String(a.title),
  slug: String(a.slug),
  subtitle: String(a.subtitle ?? ""),
  content: String(a.content ?? ""),
  publishedAt: String(a.published_at ?? ""),
  author: String((a.profiles as { name?: string })?.name ?? ""),
  topics: Array.isArray(a.topics) ? (a.topics as string[]) : [],
}));

// A number is how many days ahead to look — `1` is tomorrow, the next message
// nobody has seen. Anything else is words from a title, for reading a
// particular piece out of turn.
const arg = process.argv[2] ?? "1";
const dayKey = (d: Date) =>
  new Date(d.getTime() + 9 * 3600_000).toISOString().slice(0, 10);

let pick: DailyArticle | null = null;

if (arg && !/^\d+$/.test(arg)) {
  const needle = arg.toLowerCase();
  const found = articles.filter(
    (a) => a.title.toLowerCase().includes(needle) || a.slug.includes(needle),
  );
  if (found.length !== 1) {
    console.log(
      found.length
        ? `여러 글이 걸립니다:\n${found.map((a) => `  ${a.title}`).join("\n")}`
        : `"${arg}"에 맞는 글이 없습니다.`,
    );
    process.exit(1);
  }
  pick = found[0];
  console.log(`${pick.title}   ← 이 글을 미리 봅니다\n`);
}

// Anything further ahead than tomorrow has to walk the days in between,
// marking each pick as sent, or every day would choose the same article.
const ahead = pick ? 0 : Math.max(1, Number(arg));
for (let n = 1; n <= ahead; n += 1) {
  const when = new Date(Date.now() + n * 86_400_000);
  pick = pickDaily(articles, lastSent, when);
  if (!pick) break;
  if (n < ahead) {
    // Pretend it went out, so the next day picks something else.
    lastSent.set(pick.id, dayKey(when));
    console.log(`${dayKey(when)}  ${pick.title}`);
  } else {
    console.log(`${dayKey(when)}  ${pick.title}   ← 이 글을 미리 봅니다\n`);
  }
}

if (!pick) {
  console.log("보낼 아티클이 없습니다.");
  process.exit(0);
}
const { text, error } = await summarise(pick.title, pick.content, 500);
if (error) console.log(`⚠️ ${error}\n`);

// Without a summary the route falls back to the subtitle; preview the same.
const message = buildMessage(pick, text ?? pick.subtitle);
console.log("─".repeat(56));
console.log(message);
console.log("─".repeat(56));
console.log(`\n공백 포함 ${message.length}자`);
