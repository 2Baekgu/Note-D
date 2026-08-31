import "server-only";
import { listArticles } from "@/lib/repo";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/** Reading figures, read back out of Vercel Web Analytics.
 *
 *  The counting is Vercel's — no cookies, bots filtered, mobile and desktop
 *  the same — and this asks for the numbers so they can be shown here rather
 *  than on someone else's dashboard.
 *
 *  Hobby keeps a month of history and allows 50,000 events in one, so the
 *  breakdowns cover thirty days. The totals come from the count endpoint,
 *  which is not bounded by a date range. */

const API = "https://api.vercel.com/v1/query/web-analytics";
/** Hobby's reporting window is one month; asking for more returns nothing. */
const DAYS = 30;

export interface Point {
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

export interface Analytics {
  /** What is missing, when nothing can be asked for yet. */
  missing: "token" | "project" | null;
  /** Set when Vercel answered with an error rather than data. */
  error: string | null;
  totals: { views: number; visitors: number; today: number; last7: number; previous7: number };
  /** Summed from our own daily copies, so it outlives Vercel's retention. */
  allTime: { views: number; days: number; since: string | null };
  daily: Point[];
  articles: Ranked[];
  pages: Ranked[];
  referrers: Ranked[];
  devices: Ranked[];
  countries: Ranked[];
  browsers: Ranked[];
  days: number;
}

const blank = (missing: Analytics["missing"], error: string | null = null): Analytics => ({
  missing,
  error,
  totals: { views: 0, visitors: 0, today: 0, last7: 0, previous7: 0 },
  allTime: { views: 0, days: 0, since: null },
  daily: [],
  articles: [],
  pages: [],
  referrers: [],
  devices: [],
  countries: [],
  browsers: [],
  days: DAYS,
});

const iso = (back: number) =>
  new Date(Date.now() - back * 86_400_000).toISOString().slice(0, 10);

/** Tomorrow, as the far end of a range. Whether `until` is inclusive is not
 *  stated, and clipping today off every breakdown would be the quiet kind of
 *  wrong — a day past the end costs nothing either way. */
const tomorrow = () => iso(-1);

type Row = Record<string, unknown>;

/** The token is ours to supply; the project id Vercel already provides to
 *  every deployment, so only the token normally has to be set by hand.
 *
 *  Deliberately not named `VERCEL_…`: that prefix is Vercel's own namespace
 *  for the variables it injects, and a custom one sharing it is asking for a
 *  collision with a name they add later. */
const token = () => process.env.ANALYTICS_API_TOKEN;
const project = () => process.env.ANALYTICS_PROJECT_ID || process.env.VERCEL_PROJECT_ID;

async function ask(
  endpoint: "visits/count" | "visits/aggregate",
  params: Record<string, string>,
): Promise<{ data?: unknown; error?: string }> {
  const key = token();
  const projectId = project();
  if (!key || !projectId) return { error: "not configured" };

  const search = new URLSearchParams({ projectId, ...params });
  const team = process.env.ANALYTICS_TEAM_ID;
  if (team) search.set("teamId", team);

  try {
    const res = await fetch(`${API}/${endpoint}?${search}`, {
      headers: { Authorization: `Bearer ${key}` },
      // Five minutes is fresh enough for a reading count and keeps a reload
      // from spending an API call every time.
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      const body = await res.text();
      return { error: `${res.status} ${body.slice(0, 160)}` };
    }
    return { data: ((await res.json()) as { data?: unknown }).data };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "요청에 실패했습니다." };
  }
}

/** One grouped query, flattened into rows this screen can draw.
 *
 *  The failure is carried back rather than swallowed. An empty list and a
 *  refused query look identical on screen, and telling them apart afterwards
 *  costs a day. */
async function grouped(
  by: string,
  limit: number,
  key = by,
): Promise<{ rows: Ranked[]; error?: string }> {
  const { data, error } = await ask("visits/aggregate", {
    since: iso(DAYS),
    until: tomorrow(),
    by,
    limit: String(limit),
  });
  if (error) return { rows: [], error: `${by}: ${error}` };
  if (!Array.isArray(data)) return { rows: [] };

  return {
    rows: (data as Row[])
      .map((r) => ({
        // Vercel names the column after the dimension; fall back to the one
        // field every row has if it ever names it something else.
        label: String(r[key] ?? r[by] ?? "(알 수 없음)"),
        views: Number(r.pageviews) || 0,
        visitors: Number(r.visitors) || 0,
      }))
      .filter((r) => r.views > 0)
      .sort((a, b) => b.views - a.views),
  };
}

/** The last `days` days as Vercel has them. Shared with the cron job that
 *  writes them down, so both ask the same question the same way. */
export async function dailyFromVercel(
  days: number,
): Promise<{ days: Point[]; error?: string }> {
  const { data, error } = await ask("visits/aggregate", {
    since: iso(days),
    until: tomorrow(),
    by: "day",
  });
  if (error) return { days: [], error };
  if (!Array.isArray(data)) return { days: [] };

  return {
    days: (data as Row[])
      .map((r) => ({
        day: String(r.timestamp ?? "").slice(0, 10),
        views: Number(r.pageviews) || 0,
        visitors: Number(r.visitors) || 0,
      }))
      .filter((d) => d.day),
  };
}

/** Everything ever counted, from our own copy of each day.
 *
 *  Views add up across days; visitors do not — the same person on two days is
 *  two rows and one person — so only the total that survives the arithmetic
 *  is reported as a lifetime figure. */
async function lifetime(): Promise<{ views: number; days: number; since: string | null }> {
  const admin = getSupabaseAdminClient();
  if (!admin) return { views: 0, days: 0, since: null };

  const { data, error } = await admin
    .from("analytics_daily")
    .select("day, views")
    .order("day", { ascending: true });

  if (error || !data?.length) return { views: 0, days: 0, since: null };
  const rows = data as { day: string; views: number }[];
  const today = iso(0);
  // Today's row is a partial day; the live figure is used for it instead.
  const past = rows.filter((r) => r.day < today);
  return {
    views: past.reduce((n, r) => n + (Number(r.views) || 0), 0),
    days: past.length,
    since: rows[0]?.day ?? null,
  };
}

export async function getAnalytics(): Promise<Analytics> {
  if (!token()) return blank("token");
  if (!project()) return blank("project");

  const [totalsRes, dailyRes, paths, referrers, devices, countries, browsers, articles] =
    await Promise.all([
      ask("visits/count", {}),
      ask("visits/aggregate", { since: iso(DAYS), until: tomorrow(), by: "day" }),
      grouped("requestPath", 40),
      grouped("referrerHostname", 8),
      grouped("deviceType", 6),
      grouped("country", 8),
      grouped("browserName", 6),
      listArticles({ includeDrafts: true }),
    ]);

  const ever = await lifetime();

  const failures = [
    totalsRes.error,
    dailyRes.error,
    paths.error,
    referrers.error,
    devices.error,
    countries.error,
    browsers.error,
  ].filter(Boolean);
  if (totalsRes.error && dailyRes.error) return blank(null, totalsRes.error);

  const count = (totalsRes.data ?? {}) as Row;

  // Every day in the range, so a quiet day is a dip rather than a gap.
  const byDay = new Map<string, Point>();
  if (Array.isArray(dailyRes.data)) {
    for (const r of dailyRes.data as Row[]) {
      const day = String(r.timestamp ?? "").slice(0, 10);
      if (day) {
        byDay.set(day, {
          day,
          views: Number(r.pageviews) || 0,
          visitors: Number(r.visitors) || 0,
        });
      }
    }
  }
  const daily: Point[] = [];
  for (let i = DAYS - 1; i >= 0; i -= 1) {
    const day = iso(i);
    daily.push(byDay.get(day) ?? { day, views: 0, visitors: 0 });
  }

  // Today is still being counted, so it comes from Vercel rather than from a
  // row written last night.
  const byDayToday = byDay.get(iso(0))?.views ?? 0;

  const sum = (from: number, to: number) =>
    daily.slice(daily.length - from, daily.length - to).reduce((n, d) => n + d.views, 0);

  // A path becomes an article when one answers to that slug.
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const asArticle = (path: string) => {
    const m = path.match(/^\/articles\/([^/?#]+)\/?$/);
    return m ? bySlug.get(decodeURIComponent(m[1])) : undefined;
  };

  return {
    missing: null,
    error: failures.length ? failures.join(" · ") : null,
    totals: {
      views: Number(count.pageviews) || 0,
      visitors: Number(count.visitors) || 0,
      today: daily.at(-1)?.views ?? 0,
      last7: sum(7, 0),
      previous7: sum(14, 7),
    },
    allTime: { ...ever, views: ever.views + (byDayToday ?? 0) },
    daily,
    articles: paths.rows.flatMap<Ranked>((r) => {
      const article = asArticle(r.label);
      return article ? [{ ...r, label: article.title, href: `/articles/${article.slug}` }] : [];
    }).slice(0, 10),
    pages: paths.rows.slice(0, 10).map((r) => ({ ...r, href: r.label })),
    referrers: referrers.rows,
    devices: devices.rows,
    countries: countries.rows,
    browsers: browsers.rows,
    days: DAYS,
  };
}
