import { NextResponse } from "next/server";
import { dailyFromVercel } from "@/lib/analytics";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Copy Vercel's daily figures into our own table, once a day.
 *
 *  Vercel keeps a month on a Hobby plan. This writes down each day before it
 *  ages out, so the running total covers the whole life of the site rather
 *  than the last thirty days. It asks for a week at a time and upserts, so a
 *  missed night, a late-arriving figure, or two runs in a row all settle to
 *  the same answer.
 *
 *  Called by the Vercel cron in `vercel.json`, which sends `CRON_SECRET`. */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const offered = request.headers.get("authorization");
  // Vercel's own scheduler is the only caller; without a secret set, refuse
  // rather than leave an open write.
  if (!secret || offered !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "서버 설정이 없습니다." }, { status: 503 });
  }

  const { days, error } = await dailyFromVercel(7);
  if (error) return NextResponse.json({ error }, { status: 502 });
  if (!days.length) return NextResponse.json({ ok: true, written: 0 });

  const { error: dbError } = await admin.from("analytics_daily").upsert(
    days.map((d) => ({
      day: d.day,
      views: d.views,
      visitors: d.visitors,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: "day" },
  );

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ ok: true, written: days.length, days: days.map((d) => d.day) });
}
