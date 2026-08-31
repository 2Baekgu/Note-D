import "server-only";
import { listArticles } from "@/lib/repo";

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

/** One grouped query, flattened into rows this screen can draw. */
async function grouped(by: string, limit: number, key = by): Promise<Ranked[]> {
  const { data } = await ask("visits/aggregate", {
    since: iso(DAYS),
    until: iso(0),
    by,
    limit: String(limit),
  });
  if (!Array.isArray(data)) return [];
  return (data as Row[])
    .map((r) => ({
      label: String(r[key] ?? "(알 수 없음)"),
      views: Number(r.pageviews) || 0,
      visitors: Number(r.visitors) || 0,
    }))
    .filter((r) => r.views > 0)
    .sort((a, b) => b.views - a.views);
}

export async function getAnalytics(): Promise<Analytics> {
  if (!token()) return blank("token");
  if (!project()) return blank("project");

  const [totalsRes, dailyRes, paths, referrers, devices, countries, browsers, articles] =
    await Promise.all([
      ask("visits/count", {}),
      ask("visits/aggregate", { since: iso(DAYS), until: iso(0), by: "day" }),
      grouped("requestPath", 40),
      grouped("referrerHostname", 8),
      grouped("deviceType", 6),
      grouped("country", 8),
      grouped("browserName", 6),
      listArticles({ includeDrafts: true }),
    ]);

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
    error: totalsRes.error ?? dailyRes.error ?? null,
    totals: {
      views: Number(count.pageviews) || 0,
      visitors: Number(count.visitors) || 0,
      today: daily.at(-1)?.views ?? 0,
      last7: sum(7, 0),
      previous7: sum(14, 7),
    },
    daily,
    articles: paths.flatMap<Ranked>((r) => {
      const article = asArticle(r.label);
      return article ? [{ ...r, label: article.title, href: `/articles/${article.slug}` }] : [];
    }).slice(0, 10),
    pages: paths.slice(0, 10).map((r) => ({ ...r, href: r.label })),
    referrers,
    devices,
    countries,
    browsers,
    days: DAYS,
  };
}
