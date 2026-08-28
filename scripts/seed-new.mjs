/**
 * Inserts articles that are not in the database yet, and leaves every
 * existing row alone — some have been edited in the Studio since the last
 * seed, and a plain upsert would throw that away.
 *
 *   npm run seed-new
 */
import { readdir } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  process.exit(1);
}
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const { members } = await import("../lib/data/members.ts");
const dir = new URL("../lib/data/articles/posts/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();
const articles = [];
for (const f of files) {
  const mod = await import(new URL(f, dir).href);
  for (const v of Object.values(mod)) {
    if (v && typeof v.slug === "string") articles.push(v);
  }
}

const { data: existing, error } = await supabase.from("articles").select("slug");
if (error) { console.error(error.message); process.exit(1); }
const have = new Set(existing.map((a) => a.slug));

const { data: profiles } = await supabase.from("profiles").select("id, handle");
const idFor = (authorId) => {
  const m = members.find((x) => x.id === authorId);
  return profiles.find((p) => p.handle === m?.handle)?.id;
};

let added = 0;
let skipped = 0;
for (const a of articles) {
  if (have.has(a.slug)) { skipped += 1; continue; }
  const author = idFor(a.authorId);
  if (!author) { console.warn(`  ! ${a.slug}: no profile for ${a.authorId}`); continue; }

  const { error: err } = await supabase.from("articles").insert({
    title: a.title,
    slug: a.slug,
    subtitle: a.subtitle,
    content: a.content,
    cover_image: a.coverImage,
    author_id: author,
    topics: a.topics,
    published_at: a.publishedAt,
    status: a.status,
    references_json: a.references,
    featured: a.featured ?? false,
    sample: true,
  });
  if (err) console.warn(`  ! ${a.slug}: ${err.message}`);
  else { added += 1; console.log(`  + ${a.slug}`); }
}
console.log(`added ${added}, left alone ${skipped}`);
