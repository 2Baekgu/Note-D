import "server-only";

import { cache } from "react";

import type {
  Article,
  ArticleListItem,
  ArticleWithAuthor,
  BugReport,
  Comment,
  User,
} from "@/lib/types";
import { sampleArticles } from "@/lib/data/articles";
import { members as sampleMembers } from "@/lib/data/members";
import { sampleComments } from "@/lib/data/comments";
import { readingTime, toPlainText } from "@/lib/content/doc";
import { topicSlug } from "@/lib/utils";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseStaticClient } from "@/lib/supabase/static";

/* ────────────────────────────────────────────────────────────
   The site reads through this module only. It serves seeded
   sample content until Supabase env vars are present, then
   reads the database — falling back to samples if a query fails
   or the tables are still empty.
   ──────────────────────────────────────────────────────────── */

type ArticleRow = Record<string, unknown>;

const s = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);

function rowToArticle(row: ArticleRow): Article {
  return {
    id: s(row.id),
    title: s(row.title),
    slug: s(row.slug),
    subtitle: s(row.subtitle),
    content: s(row.content),
    coverImage: (row.cover_image as string | null) ?? null,
    authorId: s(row.author_id),
    topics: Array.isArray(row.topics) ? (row.topics as string[]) : [],
    publishedAt: s(row.published_at).slice(0, 10),
    status: row.status === "draft" ? "draft" : "published",
    createdAt: s(row.created_at),
    updatedAt: s(row.updated_at),
    references: Array.isArray(row.references_json)
      ? (row.references_json as Article["references"])
      : [],
    featured: Boolean(row.featured),
    sample: Boolean(row.sample),
  };
}

function rowToUser(row: ArticleRow): User {
  return {
    id: s(row.id),
    name: s(row.name),
    handle: s(row.handle),
    email: s(row.email),
    profileImage: (row.profile_image as string | null) ?? null,
    role: (row.role as User["role"]) ?? "member",
    title: s(row.title),
    bio: s(row.bio),
    joinedAt: s(row.joined_at).slice(0, 10),
  };
}

const unknownAuthor = (id: string): User => ({
  id,
  name: "Unknown",
  handle: "unknown",
  email: "",
  profileImage: null,
  role: "guest",
  title: "",
  bio: "",
  joinedAt: "",
});

function join(articles: Article[], users: User[]): ArticleWithAuthor[] {
  return articles.map((a) => ({
    ...a,
    author: users.find((u) => u.id === a.authorId) ?? unknownAuthor(a.authorId),
  }));
}

/* ── Members ─────────────────────────────────────────────── */

/** Memoised per request. A single page can ask for the roster three or four
 *  times over — the author of the article, the related cards, the header —
 *  and each one was its own round trip to the database. */
export const listMembers = cache(async function listMembers(): Promise<User[]> {
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("joined_at", { ascending: true });
    if (!error && data?.length) return data.map(rowToUser);
  }
  return sampleMembers;
});

/** The roster as the site shows it. Signing up makes you a guest, and a
 *  guest is a reader — they only join the list once they can publish. The
 *  Studio and the admin screens still read `listMembers`, which is everyone. */
export async function listPublicMembers(): Promise<User[]> {
  const all = await listMembers();
  return all.filter((m) => m.role !== "guest");
}

export async function getMemberByHandle(handle: string): Promise<User | null> {
  const all = await listMembers();
  return (
    all.find((m) => sameSlug(m.handle.toLowerCase(), handle.toLowerCase())) ?? null
  );
}

/* ── Build-time params ───────────────────────────────────────
   `generateStaticParams` cannot use the request-bound client, so these two
   go through the cookie-free one. Everything else still reads through
   listArticles / listMembers. */

export async function publishedArticleSlugs(): Promise<string[]> {
  const supabase = getSupabaseStaticClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("slug")
      .eq("status", "published");
    if (!error && data?.length) return (data as { slug: unknown }[]).map((r) => s(r.slug));
  }
  return sampleArticles
    .filter((a) => a.status === "published")
    .map((a) => a.slug);
}

export async function memberHandles(): Promise<string[]> {
  const supabase = getSupabaseStaticClient();
  if (supabase) {
    const { data, error } = await supabase.from("profiles").select("handle");
    if (!error && data?.length) return (data as { handle: unknown }[]).map((r) => s(r.handle));
  }
  return sampleMembers.map((m) => m.handle);
}

/* ── Articles ────────────────────────────────────────────── */

/** Memoised per request, like listMembers. An article page reaches this
 *  through generateMetadata, the page body and the related list — three
 *  identical fetches of the same 32 rows before this wrapper. */
const rawArticles = cache(async function rawArticles(
  includeDrafts = false,
): Promise<Article[]> {
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    let query = supabase.from("articles").select("*");
    if (!includeDrafts) query = query.eq("status", "published");
    const { data, error } = await query.order("published_at", {
      ascending: false,
    });
    if (!error && data?.length) return data.map(rowToArticle);
  }
  return sampleArticles.filter((a) => includeDrafts || a.status === "published");
});

export interface ArticleQuery {
  topic?: string;
  search?: string;
  authorId?: string;
  sort?: "newest" | "oldest";
  limit?: number;
  includeDrafts?: boolean;
}

export async function listArticles(
  q: ArticleQuery = {},
): Promise<ArticleWithAuthor[]> {
  const [articles, users] = await Promise.all([
    rawArticles(q.includeDrafts),
    listMembers(),
  ]);
  let result = join(articles, users);

  if (q.topic) {
    const t = q.topic.toLowerCase();
    result = result.filter((a) =>
      a.topics.some((x) => topicSlug(x) === t || x.toLowerCase() === t),
    );
  }
  if (q.authorId) result = result.filter((a) => a.authorId === q.authorId);

  if (q.search?.trim()) {
    const needle = q.search.trim().toLowerCase();
    result = result.filter((a) =>
      [a.title, a.subtitle, a.topics.join(" "), a.author.name, toPlainText(a.content)]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }

  result.sort((a, b) =>
    q.sort === "oldest"
      ? a.publishedAt.localeCompare(b.publishedAt)
      : b.publishedAt.localeCompare(a.publishedAt),
  );

  return q.limit ? result.slice(0, q.limit) : result;
}

/** A route param arrives as the raw path segment, so a slug with any
 *  non-ASCII in it — a Korean title, say — comes back percent-encoded and
 *  never matches what is stored. Korean also has two normal forms, and the
 *  one a browser sends is not always the one the editor saved. */
function sameSlug(a: string, b: string): boolean {
  const forms = (v: string) => {
    let decoded = v;
    try {
      decoded = decodeURIComponent(v);
    } catch {
      /* a stray % is not an escape; compare it as written */
    }
    return new Set([v, decoded, decoded.normalize("NFC"), decoded.normalize("NFD")]);
  };
  const left = forms(a);
  for (const form of forms(b)) if (left.has(form)) return true;
  return false;
}

export async function getArticleBySlug(
  slug: string,
  includeDrafts = false,
): Promise<ArticleWithAuthor | null> {
  const all = await listArticles({ includeDrafts });
  return all.find((a) => sameSlug(a.slug, slug)) ?? null;
}

export async function getFeaturedArticle(): Promise<ArticleWithAuthor | null> {
  const all = await listArticles();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

export async function getRelatedArticles(
  article: ArticleWithAuthor,
  limit = 3,
): Promise<ArticleWithAuthor[]> {
  const all = await listArticles();
  const scored = all
    .filter((a) => a.id !== article.id)
    .map((a) => ({
      a,
      score:
        a.topics.filter((t) => article.topics.includes(t)).length * 2 +
        (a.authorId === article.authorId ? 1 : 0),
    }))
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt));
  return scored.slice(0, limit).map((x) => x.a);
}

/** Article counts keyed by topic slug. One article counts once per topic. */
export async function topicCounts(): Promise<Record<string, number>> {
  const all = await listArticles();
  return all.reduce<Record<string, number>>((acc, a) => {
    for (const t of a.topics) {
      const key = topicSlug(t);
      acc[key] = (acc[key] ?? 0) + 1;
    }
    return acc;
  }, {});
}

export async function authorCounts(): Promise<Record<string, number>> {
  const all = await listArticles();
  return all.reduce<Record<string, number>>((acc, a) => {
    acc[a.authorId] = (acc[a.authorId] ?? 0) + 1;
    return acc;
  }, {});
}

/* ── Comments ────────────────────────────────────────────── */

export async function listComments(articleId: string): Promise<Comment[]> {
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const [{ data, error }, { data: reactionRows }, { data: auth }] = await Promise.all([
      supabase
        .from("comments")
        // Spelled out: `comment_reactions` gives comments a second route to
        // profiles, so a bare `profiles(...)` embed is ambiguous.
        .select("*, profiles!comments_author_id_fkey(name, profile_image)")
        .eq("article_id", articleId)
        .order("created_at", { ascending: true }),
      supabase.from("comment_reactions").select("comment_id, user_id, emoji"),
      supabase.auth.getUser(),
    ]);

    if (error) console.error("listComments", error.message);

    if (!error && data) {
      const me = auth?.user?.id ?? null;
      // emoji tallies, keyed by comment
      const tally = new Map<string, Map<string, { count: number; mine: boolean }>>();
      for (const r of (reactionRows ?? []) as {
        comment_id: string;
        user_id: string;
        emoji: string;
      }[]) {
        const forComment = tally.get(r.comment_id) ?? new Map();
        const seen = forComment.get(r.emoji) ?? { count: 0, mine: false };
        seen.count += 1;
        if (me && r.user_id === me) seen.mine = true;
        forComment.set(r.emoji, seen);
        tally.set(r.comment_id, forComment);
      }

      return data.map((row: ArticleRow) => {
        const profile = (row.profiles ?? {}) as ArticleRow;
        const id = s(row.id);
        return {
          id,
          articleId: s(row.article_id),
          authorId: s(row.author_id),
          authorName: s(profile.name, "Member"),
          authorImage: (profile.profile_image as string | null) ?? null,
          content: s(row.content),
          createdAt: s(row.created_at),
          parentId: (row.parent_id as string | null) ?? null,
          updatedAt: (row.updated_at as string | null) ?? null,
          reactions: [...(tally.get(id) ?? new Map())]
            .map(([emoji, v]) => ({ emoji, count: v.count, mine: v.mine }))
            .sort((a, b) => b.count - a.count || a.emoji.localeCompare(b.emoji)),
        };
      });
    }
  }
  return sampleComments
    .filter((c) => c.articleId === articleId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** Bug reports, newest first. RLS narrows this to the caller's own unless
 *  they are an admin, so the admin screen gets everything and nobody else
 *  can widen it by asking. */
export async function listBugReports(): Promise<BugReport[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("bug_reports")
    .select("*, profiles(name, email)")
    .order("created_at", { ascending: false });
  if (error || !data) return [];

  return data.map((row: ArticleRow) => {
    const profile = (row.profiles ?? {}) as ArticleRow;
    return {
      id: s(row.id),
      reporterId: (row.reporter_id as string | null) ?? null,
      reporterName: s(profile.name, "탈퇴한 사용자"),
      reporterEmail: s(profile.email),
      content: s(row.content),
      status: row.status === "resolved" ? "resolved" : "open",
      createdAt: s(row.created_at),
    };
  });
}

/** Enough opening text for search to still find a phrase from the body. */
const EXCERPT_CHARS = 300;

/** Strips the body off an article for the card grids. Reading time is worked
 *  out here, where the body still exists. */
export function toListItem(article: ArticleWithAuthor): ArticleListItem {
  const { content, ...rest } = article;
  return {
    ...rest,
    excerpt: toPlainText(content).slice(0, EXCERPT_CHARS),
    readingMinutes: readingTime(content),
  };
}
