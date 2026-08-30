import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { listArticles } from "@/lib/repo";

/** Reading figures for the admin screen.
 *
 *  Counted here rather than in SQL views: a study of three writing weekly
 *  produces a few thousand rows a year, and a plain read plus a pass in
 *  JavaScript is easier to change than a materialised view is to migrate.
 *  If this ever gets slow, that is the moment for the view — not before. */

/** PostgREST answers with a page at a time, so a busy month would otherwise
 *  be counted as its first thousand visits and no more. */
const PAGE = 1000;
/** Past this many days the trend is drawn by week; below it, by day. A young
 *  site should see every day it has had. */
const DAILY_LIMIT = 70;

export interface DayCount {
  /** `YYYY-MM-DD`, Seoul — the day, or the Monday that starts the week. */
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
  /** How the trend is bucketed, so the chart can say which it is drawing. */
  grain: "day" | "week";
  /** The first day anything was recorded, `null` when nothing has been. */
  since: string | null;
  articles: Ranked[];
  pages: Ranked[];
  referrers: Ranked[];
}

const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;
const seoulDay = (iso: string) =>
  new Date(new Date(iso).getTime() + SEOUL_OFFSET_MS).toISOString().slice(0, 10);

const empty: Stats = {
  ready: false,
  totals: { views: 0, visitors: 0, today: 0, last7: 0, previous7: 0, memberViews: 0 },
  daily: [],
  grain: "day",
  since: null,
  articles: [],
  pages: [],
  referrers: [],
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

  // Everything, from the first visit ever recorded. The site is new enough
  // that "all time" is the interesting number, and a page at a time is what
  // keeps it true once it is not.
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from("page_views")
      .select("path, visitor, is_member, referrer_host, viewed_at")
      .order("viewed_at", { ascending: true })
      .range(from, from + PAGE - 1);

    // No table yet, or not an admin asking: either way, nothing to show.
    if (error) return empty;
    if (!data?.length) break;
    rows.push(...(data as Row[]));
    if (data.length < PAGE) break;
  }

  const articles = await listArticles({ includeDrafts: true });
  if (!rows.length) return { ...empty, ready: true };
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

  // Every day since the first visit, so a quiet day reads as a dip in the
  // line rather than a day that silently never happened. Past a couple of
  // months that is more points than a chart this size can show, and the line
  // is drawn by week instead.
  const firstDay = seoulDay(rows[0].viewed_at);
  const span = Math.max(
    1,
    Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${firstDay}T00:00:00Z`)) / 86_400_000) + 1,
  );
  const grain: "day" | "week" = span > DAILY_LIMIT ? "week" : "day";

  const daily: DayCount[] = [];
  if (grain === "day") {
    for (let i = span - 1; i >= 0; i -= 1) {
      const day = dayKey(i);
      const hit = perDay.get(day);
      daily.push({ day, views: hit?.views ?? 0, visitors: hit?.visitors.size ?? 0 });
    }
  } else {
    // Weeks run back from today, so the last bucket is always the current one.
    for (let end = span - 1; end >= 0; end -= 7) {
      const bucket = { day: dayKey(Math.min(end, span - 1)), views: 0, visitors: new Set<string>() };
      for (let i = end; i > end - 7 && i >= 0; i -= 1) {
        const hit = perDay.get(dayKey(i));
        if (!hit) continue;
        bucket.views += hit.views;
        hit.visitors.forEach((v) => bucket.visitors.add(v));
      }
      daily.push({ day: bucket.day, views: bucket.views, visitors: bucket.visitors.size });
    }
    daily.reverse();
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
    grain,
    since: firstDay,
    articles: rank(perArticle, 10),
    pages: rank(perPage, 10),
    referrers: rank(
      new Map([...perReferrer].map(([k, v]) => [k, { ...v, href: undefined }])),
      8,
    ),
  };
}
