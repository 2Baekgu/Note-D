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

const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

const rows = await (
  await fetch(
    `${URL_BASE}/rest/v1/articles?select=id,title,slug,subtitle,content,published_at,profiles(name)&status=eq.published`,
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
}));

// Tomorrow, since that is the message being previewed.
const when = new Date(Date.now() + 86_400_000);
const pick = pickDaily(articles, lastSent, when);
if (!pick) {
  console.log("보낼 아티클이 없습니다.");
  process.exit(0);
}

console.log(`고른 글: ${pick.title}\n발행일: ${pick.publishedAt}\n`);
const { text, error } = await summarise(pick.title, pick.content, 500);
if (error) console.log(`⚠️ ${error}\n`);

// Without a summary the route falls back to the subtitle; preview the same.
const message = buildMessage(pick, text ?? pick.subtitle);
console.log("─".repeat(56));
console.log(message);
console.log("─".repeat(56));
console.log(`\n공백 포함 ${message.length}자`);
