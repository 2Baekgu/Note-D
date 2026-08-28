/**
 * The block editor stores its work by turning Block[] back into the dialect.
 * That is only safe if re-parsing what we wrote gives the same blocks back.
 * This asserts it against every imported article.
 */
import { readdir } from "node:fs/promises";

const { parseContent } = await import("../lib/content/parse.ts");
const { serializeBlocks } = await import("../lib/content/serialize.ts");

const dir = new URL("../lib/data/articles/posts/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();

let checked = 0;
let blocks = 0;
const failures = [];

for (const file of files) {
  const mod = await import(new URL(file, dir).href);
  for (const value of Object.values(mod)) {
    if (!value || typeof value !== "object" || typeof value.content !== "string") continue;

    const before = parseContent(value.content);
    const after = parseContent(serializeBlocks(before));
    checked += 1;
    blocks += before.length;

    if (JSON.stringify(before) !== JSON.stringify(after)) {
      const at = before.findIndex((b, i) => JSON.stringify(b) !== JSON.stringify(after[i]));
      failures.push({
        slug: value.slug,
        counts: `${before.length} → ${after.length}`,
        at,
        before: JSON.stringify(before[at])?.slice(0, 160),
        after: JSON.stringify(after[at])?.slice(0, 160),
      });
    }
  }
}

console.log(`checked ${checked} articles, ${blocks} blocks`);
if (failures.length) {
  console.log(`\n✗ ${failures.length} article(s) do not round-trip:\n`);
  for (const f of failures.slice(0, 8)) {
    console.log(`  ${f.slug}  blocks ${f.counts}  first diff at #${f.at}`);
    console.log(`    before: ${f.before}`);
    console.log(`    after:  ${f.after}\n`);
  }
  process.exit(1);
}
console.log("✓ every article round-trips");
