import type { Article, Reference } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";

const LOCAL_KEY = "notesd:articles";

/* Local drafts keep the authoring flow usable before Supabase is connected.
   They live in this browser only — the Studio UI says so. */

export function loadLocalArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Article[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: Article[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — nothing else to do */
  }
}

export function saveLocalArticle(article: Article) {
  const list = loadLocalArticles();
  const i = list.findIndex((a) => a.id === article.id);
  if (i >= 0) list[i] = article;
  else list.unshift(article);
  writeLocal(list);
}

export function deleteLocalArticle(id: string) {
  writeLocal(loadLocalArticles().filter((a) => a.id !== id));
}

export function getLocalArticle(id: string): Article | null {
  return loadLocalArticles().find((a) => a.id === id) ?? null;
}

export function emptyArticle(authorId: string): Article {
  const now = new Date().toISOString();
  return {
    id: `local-${Date.now().toString(36)}`,
    title: "",
    slug: "",
    subtitle: "",
    content: "",
    coverImage: null,
    authorId,
    topics: ["UX"],
    publishedAt: now.slice(0, 10),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    references: [],
  };
}

export function normalize(article: Article): Article {
  return {
    ...article,
    slug: article.slug.trim() || slugify(article.title) || article.id,
    topics: article.topics.map((t) => t.trim()).filter(Boolean),
    references: article.references.filter((r: Reference) => r.label.trim()),
    updatedAt: new Date().toISOString(),
  };
}

export interface SaveResult {
  ok: boolean;
  storage: "supabase" | "local";
  error?: string;
}

/** Writes to Supabase when configured, otherwise to this browser. */
export async function persistArticle(article: Article): Promise<SaveResult> {
  const clean = normalize(article);
  const supabase = getSupabaseBrowserClient();

  if (supabase) {
    const { error } = await supabase.from("articles").upsert(
      {
        id: clean.id.startsWith("local-") ? undefined : clean.id,
        title: clean.title,
        slug: clean.slug,
        subtitle: clean.subtitle,
        content: clean.content,
        cover_image: clean.coverImage,
        author_id: clean.authorId,
        topics: clean.topics,
        published_at: clean.publishedAt,
        status: clean.status,
        references_json: clean.references,
        featured: clean.featured ?? false,
        updated_at: clean.updatedAt,
      },
      { onConflict: "slug" },
    );
    if (error) return { ok: false, storage: "supabase", error: error.message };
    return { ok: true, storage: "supabase" };
  }

  saveLocalArticle(clean);
  return { ok: true, storage: "local" };
}

/** Uploads a cover image to Supabase Storage; falls back to a data URL locally. */
export async function uploadCover(file: File): Promise<{ url?: string; error?: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: String(reader.result) });
      reader.onerror = () => resolve({ error: "파일을 읽지 못했습니다." });
      reader.readAsDataURL(file);
    });
  }

  const path = `covers/${Date.now()}-${slugify(file.name) || "cover"}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
