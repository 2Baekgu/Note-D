/** Put pictures that were side by side in the original back beside each other.
 *
 *  Importing flattened those layouts into a stack, and the trace they left is
 *  a run of image blocks with nothing between them. A run alone is not proof —
 *  a writer may have stacked them on purpose — so only runs whose pictures are
 *  a matched set are taken: within a shape of each other, and not carrying
 *  captions of their own that a shared one would swallow.
 *
 *  Run with --apply to write; without it, this only reports.
 */
import fs from "node:fs";

const APPLY = process.argv.includes("--apply");
/** How different two pictures' shapes may be and still read as a set. */
const SIMILAR = 1.6;

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "content-type": "application/json" };

const text = (n) => (n.content ?? []).map((c) => c.text ?? "").join("").trim();
const blank = (n) => n.type === "paragraph" && !text(n);

const articles = await (
  await fetch(`${BASE}/rest/v1/articles?select=id,slug,content&order=slug`, { headers: H })
).json();

let rowsMade = 0, picturesMoved = 0, touched = 0;

for (const a of articles) {
  let doc;
  try { doc = JSON.parse(a.content); } catch { continue; }
  const top = doc?.content;
  if (!Array.isArray(top)) continue;

  const out = [];
  let run = [];        // the image nodes
  let pending = [];    // blank paragraphs sitting between them

  const settle = () => {
    if (run.length < 2 || run.length > 5) {
      out.push(...run, ...pending);
      run = []; pending = [];
      return;
    }
    const ratios = run.map((n) => (n.attrs?.width || 1) / (n.attrs?.height || 1));
    const spread = Math.max(...ratios) / Math.min(...ratios);
    const captions = [...new Set(run.map((n) => String(n.attrs?.title ?? "").trim()).filter(Boolean))];

    if (spread > SIMILAR || captions.length > 1) {
      out.push(...run, ...pending);
    } else {
      out.push({
        type: "imageRow",
        attrs: { caption: captions[0] ?? "" },
        // A picture inside a row never carries a caption of its own.
        content: run.map((n) => ({ ...n, attrs: { ...n.attrs, title: null } })),
      });
      rowsMade += 1;
      picturesMoved += run.length;
    }
    run = []; pending = [];
  };

  for (const node of top) {
    if (node.type === "image") { out.push(...pending.splice(0)); run.push(node); continue; }
    if (blank(node) && run.length) { pending.push(node); continue; }
    settle();
    out.push(node);
  }
  settle();

  if (JSON.stringify(out) === JSON.stringify(top)) continue;
  touched += 1;
  doc.content = out;

  if (APPLY) {
    const res = await fetch(`${BASE}/rest/v1/articles?id=eq.${a.id}`, {
      method: "PATCH", headers: H, body: JSON.stringify({ content: JSON.stringify(doc) }),
    });
    if (!res.ok) console.log(`   ✗ ${a.slug} ${res.status}`);
    else console.log(`   ${a.slug}`);
  } else {
    console.log(`   ${a.slug}`);
  }
}

console.log(`\n${APPLY ? "적용" : "예상"}: ${touched}편 · 행 ${rowsMade}개 · 이미지 ${picturesMoved}장`);
