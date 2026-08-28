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

/** 10MB. Body images go into the article text, and in demo mode that means a
 *  base64 data URL in localStorage — which has a few megabytes to spend. */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

/** Uploads an image to Supabase Storage; falls back to a data URL locally.
 *  `folder` separates covers from the images dropped into a body. */
export async function uploadImage(
  file: File,
  folder: "covers" | "body" = "covers",
): Promise<{ url?: string; error?: string }> {
  if (!file.type.startsWith("image/")) {
    return { error: `${file.name}은(는) 이미지 파일이 아닙니다.` };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    const mb = (file.size / 1024 / 1024).toFixed(1);
    return { error: `${file.name}이(가) 너무 큽니다 (${mb}MB). 10MB 이하로 줄여주세요.` };
  }

  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: String(reader.result) });
      reader.onerror = () => resolve({ error: `${file.name}을(를) 읽지 못했습니다.` });
      reader.readAsDataURL(file);
    });
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "png";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || folder;
  // The markdown image syntax stops the src at the first space, so the stored
  // path must never contain one.
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}

/** Kept for the cover field, which only ever uploads one file. */
export const uploadCover = (file: File) => uploadImage(file, "covers");
