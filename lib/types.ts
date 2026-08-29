/** Shared domain types. These mirror the Supabase schema in `supabase/schema.sql`
 *  so the sample-data layer and the database layer stay interchangeable. */

/** `guest` is what everyone starts as on sign-up: read and comment only.
 *  `member` may publish in the Studio. `admin` may do both and manage roles. */
export type Role = "admin" | "member" | "guest";
export type ArticleStatus = "draft" | "published";

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  profileImage: string | null;
  role: Role;
  title: string;
  bio: string;
  joinedAt: string;
  links?: { label: string; url: string }[];
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Index into the cover-art palette, keeps a topic visually consistent. */
  tone: number;
}

export interface Reference {
  label: string;
  source?: string;
  url?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  /** Editorial markdown — parsed by `lib/content/parse.ts` into blocks. */
  content: string;
  coverImage: string | null;
  authorId: string;
  /** One article sits under several topics — they overlap by nature, so a
   *  single category always felt wrong. Ordered: the first one leads. */
  topics: string[];
  publishedAt: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
  references: Reference[];
  featured?: boolean;
  /** Marks seeded demo content so the UI can label it honestly. */
  sample?: boolean;
}

/** Something a reader hit and wanted fixed. The body is a TipTap document,
 *  same as an article, so a screenshot can sit inside the sentence about it. */
export interface BugReport {
  id: string;
  reporterId: string | null;
  reporterName: string;
  reporterEmail: string;
  content: string;
  status: "open" | "resolved";
  createdAt: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  /** Whether the person reading has left this one. */
  mine: boolean;
}

/** Something that happened on your writing while you were away. */
export interface Notification {
  id: string;
  type: "comment" | "reply" | "reaction";
  actorName: string;
  actorImage: string | null;
  articleTitle: string;
  articleSlug: string;
  /** The comment to land on, so the link goes to the remark and not the page. */
  commentId: string | null;
  emoji: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  content: string;
  createdAt: string;
  /** The comment this answers, if it answers one. One level only. */
  parentId: string | null;
  /** Set once the comment has been edited, so the thread can say so. */
  updatedAt: string | null;
  reactions: Reaction[];
}

export interface ArticleWithAuthor extends Article {
  author: User;
}

/** What a card renders, which is everything but the body. The body is by far
 *  an article's heaviest field and no card shows it, so a list of fifty would
 *  otherwise carry 375KB of prose nobody reads. `excerpt` keeps the browser's
 *  instant search useful at a fraction of that. */
export interface ArticleListItem extends Omit<ArticleWithAuthor, "content"> {
  excerpt: string;
  readingMinutes: number;
}
