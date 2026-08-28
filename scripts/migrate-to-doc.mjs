/** One-time: rewrite the imported articles from the editorial dialect into
 *  TipTap documents, so every article in the repo and the database is in the
 *  one format the editor writes. `scripts/check-doc.mjs` is the gate that says
 *  this is lossless; run it first. */
import { readdir, readFile, writeFile } from "node:fs/promises";

const { parseContent } = await import("../lib/content/parse.ts");
const { blocksToDoc, isDoc } = await import("../lib/content/doc.ts");

const dir = new URL("../lib/data/articles/posts/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();

let done = 0;
let skipped = 0;

for (const file of files) {
  const url = new URL(file, dir);
  const mod = await import(url.href);
  const article = Object.values(mod).find((v) => v && typeof v.content === "string");
  if (!article) continue;

  if (isDoc(article.content)) {
    skipped += 1;
    continue;
  }

  const doc = blocksToDoc(parseContent(article.content));
  const json = JSON.stringify(doc, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n");

  const source = await readFile(url, "utf8");
  const start = source.indexOf("  content: `");
  if (start === -1) {
    console.warn(`  ! ${file}: no content literal`);
    continue;
  }
  // Scan to the closing backtick, stepping over escaped ones.
  let i = start + "  content: `".length;
  while (i < source.length) {
    if (source[i] === "\\") i += 2;
    else if (source[i] === "`") break;
    else i += 1;
  }

  // The literal was followed by its own comma; do not add a second one.
  let after = source.slice(i + 1);
  if (after.startsWith(",")) after = after.slice(1);

  const next = `  content: JSON.stringify(${json}),`;
  await writeFile(url, source.slice(0, start) + next + after, "utf8");
  done += 1;
}

console.log(`rewritten ${done}, already documents ${skipped}`);
