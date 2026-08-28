/**
 * Same move as scripts/cover-into-body.mjs, but against the database, so
 * articles edited since the last seed keep their edits.
 *
 *   npm run cover-into-body
 *
 * Idempotent: an article whose cover is already in its body is left alone.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: articles, error } = await supabase
  .from("articles")
  .select("id, slug, title, cover_image, content");
if (error) {
  console.error("could not read articles:", error.message);
  process.exit(1);
}

let moved = 0;
let already = 0;
let skipped = 0;

for (const article of articles) {
  if (!article.cover_image || article.cover_image.startsWith("art:")) {
    skipped += 1;
    continue;
  }

  let doc;
  try {
    doc = JSON.parse(article.content);
  } catch {
    console.warn(`  ! ${article.slug}: content is not a document, left alone`);
    skipped += 1;
    continue;
  }
  if (doc?.type !== "doc") {
    skipped += 1;
    continue;
  }

  const has = (doc.content ?? []).some(
    (n) => n.type === "image" && n.attrs?.src === article.cover_image,
  );
  if (has) {
    already += 1;
    continue;
  }

  doc.content = [
    { type: "image", attrs: { src: article.cover_image, alt: article.title, title: null } },
    ...(doc.content ?? []),
  ];

  const { error: err } = await supabase
    .from("articles")
    .update({ content: JSON.stringify(doc) })
    .eq("id", article.id);

  if (err) console.warn(`  ! ${article.slug}: ${err.message}`);
  else {
    moved += 1;
    console.log(`  ✓ ${article.slug}`);
  }
}

console.log(`moved ${moved}, already there ${already}, no cover ${skipped}`);
