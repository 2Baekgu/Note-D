import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { listArticles } from "@/lib/repo";

/** Reading figures for the admin screen.
 *
 *  Counted here rather than in SQL views: a study of three writing weekly
 *  produces a few thousand rows a year, and a plain read plus a pass in
 *  JavaScript is easier to change than a materialised view is to migrate.
 *  If this ever gets slow, that is the moment for the view — not before. */

const WINDOW_DAYS = 90;
const TREND_DAYS = 30;

export interface DayCount {
  /** `YYYY-MM-DD`, Seoul. */
  day: string;
  views: number;
  visitors: number;
}

export interface Ranked {
  label: string;
  href?: string;
  views: number;
  visitors: number;
}

export interface Stats {
  /** False when the table has not been created yet. */
  ready: boolean;
  totals: {
    views: number;
    visitors: number;
    today: number;
    last7: number;
    previous7: number;
    memberViews: number;
  };
  daily: DayCount[];
  articles: Ranked[];
  pages: Ranked[];
  referrers: Ranked[];
  windowDays: number;
}

const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;
const seoulDay = (iso: string) =>
  new Date(new Date(iso).getTime() + SEOUL_OFFSET_MS).toISOString().slice(0, 10);

const empty: Stats = {
  ready: false,
  totals: { views: 0, visitors: 0, today: 0, last7: 0, previous7: 0, memberViews: 0 },
  daily: [],
  articles: [],
  pages: [],
  referrers: [],
  windowDays: WINDOW_DAYS,
};

type Row = {
  path: string;
  visitor: string;
  is_member: boolean;
  referrer_host: string | null;
  viewed_at: string;
};

/** Rank by views, then by the reach behind them, then by name so the order
 *  never wobbles between two equal rows. */
function rank(
  groups: Map<string, { views: number; visitors: Set<string>; href?: string }>,
  limit: number,
): Ranked[] {
  return [...groups.entries()]
    .map(([label, g]) => ({
      label,
      href: g.href,
      views: g.views,
      visitors: g.visitors.size,
    }))
    .sort((a, b) => b.views - a.views || b.visitors - a.visitors || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export async function getStats(): Promise<Stats> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return empty;

  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000).toISOString();
  const [{ data, error }, articles] = await Promise.all([
    supabase
      .from("page_views")
      .select("path, visitor, is_member, referrer_host, viewed_at")
      .gte("viewed_at", since)
      .order("viewed_at", { ascending: true }),
    listArticles({ includeDrafts: true }),
  ]);

  // No table yet, or not an admin asking: either way there is nothing to show.
  if (error || !data) return empty;

  const rows = data as Row[];
  // Which article a view belongs to is read from the path rather than a
  // stored id: the path already carries the slug, and a row recorded before
  // an article existed still finds its way home.
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const articleOf = (path: string) => {
    const m = path.match(/^\/articles\/([^/?#]+)/);
    return m ? bySlug.get(decodeURIComponent(m[1])) : undefined;
  };

  const today = seoulDay(new Date().toISOString());
  const dayKey = (n: number) => seoulDay(new Date(Date.now() - n * 86_400_000).toISOString());
  const weekAgo = dayKey(7);
  const twoWeeksAgo = dayKey(14);

  const visitors = new Set<string>();
  const perDay = new Map<string, { views: number; visitors: Set<string> }>();
  const perArticle = new Map<string, { views: number; visitors: Set<string>; href?: string }>();
  const perPage = new Map<string, { views: number; visitors: Set<string>; href?: string }>();
  const perReferrer = new Map<string, { views: number; visitors: Set<string> }>();

  let todayViews = 0;
  let last7 = 0;
  let previous7 = 0;
  let memberViews = 0;

  const bump = (
    map: Map<string, { views: number; visitors: Set<string>; href?: string }>,
    key: string,
    visitor: string,
    href?: string,
  ) => {
    const entry = map.get(key) ?? { views: 0, visitors: new Set<string>(), href };
    entry.views += 1;
    entry.visitors.add(visitor);
    if (href) entry.href = href;
    map.set(key, entry);
  };

  for (const row of rows) {
    const day = seoulDay(row.viewed_at);
    visitors.add(row.visitor);
    if (row.is_member) memberViews += 1;
    if (day === today) todayViews += 1;
    if (day > weekAgo) last7 += 1;
    else if (day > twoWeeksAgo) previous7 += 1;

    const d = perDay.get(day) ?? { views: 0, visitors: new Set<string>() };
    d.views += 1;
    d.visitors.add(row.visitor);
    perDay.set(day, d);

    const article = articleOf(row.path);
    if (article) bump(perArticle, article.title, row.visitor, `/articles/${article.slug}`);
    bump(perPage, row.path, row.visitor, row.path);
    if (row.referrer_host) {
      const r = perReferrer.get(row.referrer_host) ?? { views: 0, visitors: new Set<string>() };
      r.views += 1;
      r.visitors.add(row.visitor);
      perReferrer.set(row.referrer_host, r);
    }
  }

  // Every day in the window, so a quiet day is a gap in the line rather than
  // a day that silently never happened.
  const daily: DayCount[] = [];
  for (let i = TREND_DAYS - 1; i >= 0; i -= 1) {
    const day = dayKey(i);
    const hit = perDay.get(day);
    daily.push({ day, views: hit?.views ?? 0, visitors: hit?.visitors.size ?? 0 });
  }

  return {
    ready: true,
    totals: {
      views: rows.length,
      visitors: visitors.size,
      today: todayViews,
      last7,
      previous7,
      memberViews,
    },
    daily,
    articles: rank(perArticle, 10),
    pages: rank(perPage, 10),
    referrers: rank(
      new Map([...perReferrer].map(([k, v]) => [k, { ...v, href: undefined }])),
      8,
    ),
    windowDays: WINDOW_DAYS,
  };
}
