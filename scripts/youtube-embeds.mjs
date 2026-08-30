/** Turn a paragraph that is nothing but a YouTube link into the video itself.
 *
 *  Only a paragraph whose whole text is the link: a link inside a sentence is
 *  a reference the sentence is making, and replacing it would take the
 *  sentence apart. A title sitting immediately above becomes the caption,
 *  which is how these were written — the name of the clip, then the clip.
 *
 *  Run with --apply to write; without it, this only reports.
 */
import fs from "node:fs";
import { parseYoutube } from "../lib/content/nodes/youtube.ts";

const APPLY = process.argv.includes("--apply");

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "content-type": "application/json" };

const text = (n) => (n.content ?? []).map((c) => c.text ?? "").join("").trim();

/** The link a lone paragraph holds, allowing for the leftovers importing
 *  left behind: an `@embed` marker, or a markdown link written out twice. */
function loneLink(node) {
  if (node.type !== "paragraph") return null;
  let t = text(node);
  if (!t) return null;
  t = t.replace(/^@embed\s+/i, "").trim();
  const md = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (md && md[1].trim() === md[2].trim()) t = md[2].trim();
  if (/\s/.test(t)) return null;
  return parseYoutube(t);
}

const articles = await (
  await fetch(`${BASE}/rest/v1/articles?select=id,slug,content&order=slug`, { headers: H })
).json();

let made = 0, touched = 0;

for (const a of articles) {
  let doc;
  try { doc = JSON.parse(a.content); } catch { continue; }
  const top = doc?.content;
  if (!Array.isArray(top)) continue;

  const out = [];
  for (const node of top) {
    const video = loneLink(node);
    if (!video) { out.push(node); continue; }

    // A short line just above may be the clip's name — that is how these
    // were written, the name of the video and then the video. A sentence is
    // not a name, and sentence punctuation is what gives it away.
    const prev = out[out.length - 1];
    const label = prev && prev.type === "paragraph" ? text(prev) : "";
    const isTitle = Boolean(label) && label.length <= 90 && !/[.!?。！？]/.test(label);
    if (isTitle) out.pop();

    out.push({
      type: "youtube",
      attrs: { videoId: video.id, start: video.start, title: isTitle ? label : "" },
    });
    made += 1;
    console.log(`   ${a.slug}  →  ${video.id}${video.start ? ` @${video.start}s` : ""}${isTitle ? `  «${label.slice(0, 44)}»` : ""}`);
  }

  if (out.length === top.length && JSON.stringify(out) === JSON.stringify(top)) continue;
  touched += 1;
  doc.content = out;

  if (APPLY) {
    const res = await fetch(`${BASE}/rest/v1/articles?id=eq.${a.id}`, {
      method: "PATCH", headers: H, body: JSON.stringify({ content: JSON.stringify(doc) }),
    });
    if (!res.ok) console.log(`   ✗ ${a.slug} ${res.status}`);
  }
}

console.log(`\n${APPLY ? "적용" : "예상"}: ${touched}편 · 영상 ${made}개`);
