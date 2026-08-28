/**
 * Pushes the seeded sample content into Supabase.
 *
 *   NEXT_PUBLIC_SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… npm run seed
 *
 * Members are created as real auth users (password-less) so that the article
 * author_id foreign keys resolve. Re-running is safe: rows are upserted.
 */
import { readdir } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  process.exit(1);
}

// Node 22.6+ strips the types from these .ts modules natively. Every import
// in them is `import type`, so nothing needs the `@/` alias at runtime.
const { members } = await import("../lib/data/members.ts");

// Read the post files directly rather than through articles/index.ts — that
// barrel imports without file extensions, which TypeScript resolves and Node
// does not.
const postsDir = new URL("../lib/data/articles/posts/", import.meta.url);
const postFiles = (await readdir(postsDir)).filter((f) => f.endsWith(".ts")).sort();
const sampleArticles = [];
for (const f of postFiles) {
  const mod = await import(new URL(f, postsDir).href);
  for (const value of Object.values(mod)) {
    if (value && typeof value === "object" && typeof value.slug === "string") {
      sampleArticles.push(value);
    }
  }
}
sampleArticles.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

/* The 32 articles hang off these two accounts. Sign-in is Google-only, so the
   seeded address has to be the real Google address — Supabase links the two
   when the email matches and is verified. Passed by env so no personal
   address ends up in the repo:

     SEED_SUYEON_EMAIL=…@gmail.com SEED_SIENNA_EMAIL=…@gmail.com npm run seed */
const emailOverrides = {
  "u-suyeon": process.env.SEED_SUYEON_EMAIL,
  "u-sienna": process.env.SEED_SIENNA_EMAIL,
};

console.log("→ members");
const idMap = new Map();
for (const m of members) {
  const email = emailOverrides[m.id]?.trim() || m.email;
  if (!emailOverrides[m.id]) {
    console.warn(
      `  ! ${m.name}: placeholder email ${email} — set ${
        m.id === "u-suyeon" ? "SEED_SUYEON_EMAIL" : "SEED_SIENNA_EMAIL"
      } so Google sign-in claims these articles`,
    );
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: m.name, handle: m.handle },
  });

  let userId = data?.user?.id;
  if (error && !userId) {
    const { data: list } = await supabase.auth.admin.listUsers();
    userId = list?.users.find((u) => u.email === email)?.id;
  }
  if (!userId) {
    console.warn(`  ! skipped ${email}: ${error?.message}`);
    continue;
  }

  idMap.set(m.id, userId);
  await supabase.from("profiles").upsert(
    {
      id: userId,
      name: m.name,
      handle: m.handle,
      email,
      profile_image: m.profileImage,
      role: m.role,
      title: m.title,
      bio: m.bio,
      joined_at: m.joinedAt,
    },
    { onConflict: "id" },
  );
}

console.log("→ articles");
for (const a of sampleArticles) {
  const authorId = idMap.get(a.authorId);
  if (!authorId) continue;
  const { error } = await supabase.from("articles").upsert(
    {
      title: a.title,
      slug: a.slug,
      subtitle: a.subtitle,
      content: a.content,
      cover_image: a.coverImage,
      author_id: authorId,
      topics: a.topics,
      published_at: a.publishedAt,
      status: a.status,
      references_json: a.references,
      featured: a.featured ?? false,
      sample: true,
    },
    { onConflict: "slug" },
  );
  if (error) console.warn(`  ! ${a.slug}: ${error.message}`);
}

console.log(`✓ seed complete — ${sampleArticles.length} articles`);
