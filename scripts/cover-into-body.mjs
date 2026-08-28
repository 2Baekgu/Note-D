/**
 * The article page used to draw `coverImage` above the body, so the imported
 * articles kept their first picture there and nowhere else. The cover is only
 * a thumbnail now, so that picture has to live in the article itself.
 *
 * Moves it to the top of the body for any article whose cover is not already
 * in there. Idempotent.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";

const dir = new URL("../lib/data/articles/posts/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();

let moved = 0;
let already = 0;
let skipped = 0;

for (const file of files) {
  const url = new URL(file, dir);
  const mod = await import(url.href);
  const article = Object.values(mod).find((v) => v && typeof v.content === "string");
  if (!article?.coverImage || article.coverImage.startsWith("art:")) {
    skipped += 1;
    continue;
  }

  const doc = JSON.parse(article.content);
  const has = (doc.content ?? []).some(
    (n) => n.type === "image" && n.attrs?.src === article.coverImage,
  );
  if (has) {
    already += 1;
    continue;
  }

  doc.content = [
    { type: "image", attrs: { src: article.coverImage, alt: article.title, title: null } },
    ...(doc.content ?? []),
  ];

  const json = JSON.stringify(doc, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : `  ${line}`))
    .join("\n");

  const source = await readFile(url, "utf8");
  // The call is pretty-printed, so it closes on its own line at this indent.
  const start = source.indexOf("  content: JSON.stringify(");
  const CLOSE = "\n  }),";
  const end = source.indexOf(CLOSE, start);
  if (start === -1 || end === -1) {
    console.warn(`  ! ${file}: could not find the content call`);
    continue;
  }

  await writeFile(
    url,
    source.slice(0, start) +
      `  content: JSON.stringify(${json}),` +
      source.slice(end + CLOSE.length),
    "utf8",
  );
  moved += 1;
}

console.log(`moved ${moved}, already there ${already}, no cover ${skipped}`);
