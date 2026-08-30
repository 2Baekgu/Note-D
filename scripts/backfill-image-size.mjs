/** Fill in every stored image's natural size.
 *
 *  A row divides the line by each picture's shape, so the shape has to be in
 *  the document — the published page has no way to measure. It also stops the
 *  text jumping as pictures arrive, which is worth having on its own.
 *
 *  Run with --apply to write; without it, this only reports.
 */
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "./image-size.mjs";

const APPLY = process.argv.includes("--apply");

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const URL_BASE = env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, "content-type": "application/json" };

const cache = new Map();

async function sizeOf(src) {
  if (cache.has(src)) return cache.get(src);
  let result = null;

  if (src.startsWith("/")) {
    const file = path.join("public", decodeURIComponent(src));
    if (fs.existsSync(file)) result = imageSize(file);
  } else if (/^https?:/.test(src)) {
    try {
      // The header is all we need, and it lives in the first few kilobytes.
      const res = await fetch(src, { headers: { range: "bytes=0-65535" } });
      if (res.ok) {
        const tmp = path.join("/tmp", `probe-${Math.random().toString(36).slice(2)}`);
        fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
        result = imageSize(tmp);
        fs.unlinkSync(tmp);
      }
    } catch {
      /* unreachable pictures keep their unknown size */
    }
  }
  cache.set(src, result);
  return result;
}

const articles = await (
  await fetch(`${URL_BASE}/rest/v1/articles?select=id,slug,content`, { headers: H })
).json();

let touched = 0, filled = 0, missed = 0;

for (const a of articles) {
  let doc;
  try { doc = JSON.parse(a.content); } catch { continue; }
  if (!doc || typeof doc !== "object") continue;

  let changed = false;
  const walk = async (node) => {
    if (node?.type === "image" && node.attrs?.src) {
      if (!node.attrs.width || !node.attrs.height) {
        const size = await sizeOf(node.attrs.src);
        if (size) {
          node.attrs.width = size.width;
          node.attrs.height = size.height;
          changed = true;
          filled += 1;
        } else {
          missed += 1;
          console.log(`   ? 크기를 못 읽음  ${node.attrs.src}`);
        }
      }
    }
    for (const c of node?.content ?? []) await walk(c);
  };
  await walk(doc);

  if (!changed) continue;
  touched += 1;
  if (APPLY) {
    const res = await fetch(`${URL_BASE}/rest/v1/articles?id=eq.${a.id}`, {
      method: "PATCH", headers: H, body: JSON.stringify({ content: JSON.stringify(doc) }),
    });
    if (!res.ok) console.log(`   ✗ ${a.slug} 저장 실패 ${res.status}`);
  }
}

console.log(`\n${APPLY ? "적용" : "예상"}: 아티클 ${touched}편 · 이미지 ${filled}장에 크기 기록 · 못 읽음 ${missed}장`);
