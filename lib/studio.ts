import type { Article, Reference } from "@/lib/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { firstLine } from "@/lib/content/doc";

const LOCAL_KEY = "noted:articles";

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

/** Removes a published article. The row policy allows this for its author
 *  and for an admin; anyone else is refused by the database, not by us. */
export async function deleteArticle(id: string): Promise<{ ok: boolean; error?: string }> {
  if (id.startsWith("local-")) {
    deleteLocalArticle(id);
    return { ok: true };
  }
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    deleteLocalArticle(id);
    return { ok: true };
  }
  const { error } = await supabase.from("articles").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
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
    // Nobody types a subtitle any more. One already written is left alone;
    // an article without one is summarised by its opening line.
    subtitle: article.subtitle.trim() || firstLine(article.content),
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
/** `slug` is unique, and an upsert keyed on it would quietly write over
 *  someone else's article when two titles reduce to the same thing — which
 *  a placeholder title like "제목" makes likely. Take the next free one. */
async function freeSlug(
  supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>,
  base: string,
  id: string | undefined,
): Promise<string> {
  const stem = base || "untitled";
  for (let n = 1; n < 50; n++) {
    const candidate = n === 1 ? stem : `${stem}-${n}`;
    const { data } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data || (id && (data as { id: string }).id === id)) return candidate;
  }
  return `${stem}-${Date.now().toString(36)}`;
}

export async function persistArticle(article: Article): Promise<SaveResult> {
  const clean = normalize(article);
  const supabase = getSupabaseBrowserClient();

  if (supabase) {
    const id = clean.id.startsWith("local-") ? undefined : clean.id;
    const slug = await freeSlug(supabase, clean.slug, id);

    const { error } = await supabase.from("articles").upsert(
      {
        id,
        title: clean.title,
        slug,
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

/** What a storage key may contain: letters, digits and the hyphen. A space
 *  would break the markdown image syntax; anything non-ASCII is refused
 *  outright. */
const asciiSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

/** Uploads an image to Supabase Storage; falls back to a data URL locally.
 *  `folder` separates covers from the images dropped into a body. */
export async function uploadImage(
  file: File,
  folder: "covers" | "body" | "avatars" | "bug-reports" = "covers",
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

  // `slugify` keeps Hangul on purpose — an article's address reads better for
  // it. A storage key cannot: Supabase rejects anything outside ASCII with
  // "Invalid key", which is how a screenshot named 화면-캡처.png failed to
  // upload at all. The timestamp and the random suffix are what make the name
  // unique, so dropping the rest of it costs nothing.
  const ext = (file.name.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = asciiSlug(file.name.replace(/\.[^.]+$/, "")) || folder;
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${base}.${ext || "png"}`;

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

/* ── Avatars ──────────────────────────────────────────────── */

/** Square, small, and encoded inline. A face at 192px is a few kilobytes, so
 *  it can live in `profiles.profile_image` directly. */
async function shrinkToSquare(file: File, size = 192): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("이 브라우저에서는 사진을 처리할 수 없습니다.");
  ctx.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    size,
    size,
  );
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

/** A profile picture, however it can be stored.
 *
 *  Storage is the better home — the article list would otherwise carry every
 *  author's bytes — so try it first. But uploading is gated on being able to
 *  publish, and choosing your own face is not publishing, so a guest falls
 *  back to a shrunken inline copy rather than being told no. */
export async function uploadAvatar(file: File): Promise<{ url?: string; error?: string }> {
  if (!file.type.startsWith("image/")) {
    return { error: "이미지 파일을 선택해주세요." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: `사진이 너무 큽니다 (${(file.size / 1024 / 1024).toFixed(1)}MB).` };
  }

  let inline: string;
  try {
    inline = await shrinkToSquare(file);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "사진을 처리하지 못했습니다." };
  }

  const supabase = getSupabaseBrowserClient();
  if (!supabase) return { url: inline };

  const path = `avatars/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const blob = await (await fetch(inline)).blob();
  const { error } = await supabase.storage.from("media").upload(path, blob, {
    cacheControl: "3600",
    contentType: "image/jpeg",
    upsert: false,
  });
  if (error) return { url: inline };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
