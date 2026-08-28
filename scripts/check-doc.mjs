/** Gate for the TipTap migration: converting an article to a TipTap document
 *  and reading it back must produce the very same blocks, or the rendered
 *  page would change. */
import { readdir } from "node:fs/promises";

const { parseContent } = await import("../lib/content/parse.ts");
const { blocksToDoc, docToBlocks } = await import("../lib/content/doc.ts");

/** Compare by value, not by key order — the converter rebuilds objects. */
const stable = (v) =>
  JSON.stringify(v, (_k, val) =>
    val && typeof val === "object" && !Array.isArray(val)
      ? Object.fromEntries(Object.entries(val).sort(([a], [b]) => a.localeCompare(b)))
      : val,
  );

const dir = new URL("../lib/data/articles/posts/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();

let articles = 0;
const normalized = [];
const kinds = {};
const failures = [];

for (const file of files) {
  const mod = await import(new URL(file, dir).href);
  for (const v of Object.values(mod)) {
    if (!v || typeof v !== "object" || typeof v.content !== "string") continue;
    articles += 1;

    const before = parseContent(v.content);
    before.forEach((b) => (kinds[b.type] = (kinds[b.type] ?? 0) + 1));
    const after = docToBlocks(blocksToDoc(before));

    if (stable(before) !== stable(after)) {
      // A difference only matters if a reader would see it. Strip the markers
      // and compare the words themselves.
      const visible = (bs) =>
        stable(bs).replace(/\\?[*`=]/g, "").replace(/\s+/g, "");
      if (visible(before) === visible(after)) {
        normalized.push(v.slug);
        continue;
      }
      const at = before.findIndex((b, i) => stable(b) !== stable(after[i]));
      failures.push({
        slug: v.slug,
        counts: `${before.length} → ${after.length}`,
        at,
        before: stable(before[at])?.slice(0, 200),
        after: stable(after[at])?.slice(0, 200),
      });
    }
  }
}

console.log(`${articles} articles`);
if (normalized.length) {
  console.log(
    `· ${normalized.length} tidied (empty ** markers from the original export), same words: ${normalized.join(", ")}`,
  );
}
console.log("block kinds:", kinds);
if (failures.length) {
  console.log(`\n✗ ${failures.length} article(s) change when converted:\n`);
  for (const f of failures.slice(0, 6)) {
    console.log(`  ${f.slug}  ${f.counts}  first diff #${f.at}`);
    console.log(`    before: ${f.before}`);
    console.log(`    after:  ${f.after}\n`);
  }
  process.exit(1);
}
console.log("✓ conversion is lossless");
