import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { summarise } from "@/lib/summary";
import {
  articleUrl,
  buildMessage,
  fitIntro,
  introBudget,
  pickDaily,
  seoulDay,
  type DailyArticle,
} from "@/lib/daily-pick";

/** One article a morning for the study's open chat. An iPhone Shortcut calls
 *  this at 9am, takes `message`, and pastes it into the room.
 *
 *  The pick is recorded here rather than by the Shortcut, so a retry or a
 *  double-run returns the same text instead of burning a second article. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Constant-time, and length-safe: `timingSafeEqual` throws on a mismatch. */
function tokenMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function authorise(request: Request): boolean {
  const expected = process.env.DAILY_PICK_TOKEN ?? "";
  if (!expected) return false;

  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const query = new URL(request.url).searchParams.get("token") ?? "";
  const given = bearer || query;

  return Boolean(given) && tokenMatches(given, expected);
}

/** `?format=text` answers with the message alone, so a Shortcut can copy the
 *  body straight to the clipboard without a dictionary step in between. */
function send(request: Request, payload: { message: string } & Record<string, unknown>) {
  const wantsText = new URL(request.url).searchParams.get("format") === "text";
  if (wantsText) {
    return new Response(payload.message, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return NextResponse.json(payload);
}

/** Replays a row that was already written today, so a second call this
 *  morning repeats the first one word for word. */
function replay(
  request: Request,
  articles: DailyArticle[],
  articleId: string,
  message: string,
  sentOn: string,
) {
  const article = articles.find((a) => a.id === articleId);
  return send(request, {
    message,
    articleId,
    title: article?.title ?? "",
    url: article ? articleUrl(article.slug) : "",
    author: article?.author ?? "",
    publishedAt: article?.publishedAt ?? "",
    sentOn,
    repeated: true,
  });
}

export async function GET(request: Request) {
  if (!authorise(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured for this environment." },
      { status: 500 },
    );
  }

  const today = seoulDay(new Date());

  const { data: articleRows, error: articleError } = await supabase
    .from("articles")
    .select("id, title, slug, subtitle, content, published_at, profiles(name)")
    .eq("status", "published");

  if (articleError) {
    return NextResponse.json({ error: articleError.message }, { status: 500 });
  }

  const articles: DailyArticle[] = (articleRows ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const profile = (r.profiles ?? {}) as { name?: string };
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      slug: String(r.slug ?? ""),
      subtitle: String(r.subtitle ?? ""),
      content: String(r.content ?? ""),
      publishedAt: String(r.published_at ?? "").slice(0, 10),
      author: profile.name ?? "Note:D",
    };
  });

  if (!articles.length) {
    return NextResponse.json({ error: "발행된 아티클이 없습니다." }, { status: 404 });
  }

  const { data: sendRows, error: sendError } = await supabase
    .from("daily_sends")
    .select("article_id, sent_at, sent_on, message");

  if (sendError) {
    return NextResponse.json({ error: sendError.message }, { status: 500 });
  }

  const sends = (sendRows ?? []) as {
    article_id: string;
    sent_at: string;
    sent_on: string;
    message: string;
  }[];

  // Already picked this morning: hand back exactly what went out, so a retry
  // or a second run of the Shortcut cannot post a different article.
  const already = sends.find((s) => s.sent_on === today);
  if (already) return replay(request, articles, already.article_id, already.message, today);

  const lastSent = new Map<string, string>();
  for (const s of sends) {
    const seen = lastSent.get(s.article_id);
    if (!seen || s.sent_at > seen) lastSent.set(s.article_id, s.sent_at);
  }

  const chosen = pickDaily(articles, lastSent);
  if (!chosen) {
    return NextResponse.json({ error: "보낼 아티클을 찾지 못했습니다." }, { status: 404 });
  }

  // A summary is nice to have; the message is not optional. The budget is
  // what is left of the 500 characters KakaoTalk shows before it folds the
  // message away — the model is told it, and trimmed to it if it overruns.
  const budget = introBudget(chosen);
  const summary = await summarise(chosen.title, chosen.content, budget);
  const message = buildMessage(chosen, fitIntro(summary.text ?? chosen.subtitle, budget));

  const { error: insertError } = await supabase
    .from("daily_sends")
    .insert({ article_id: chosen.id, sent_on: today, message });

  if (insertError) {
    // 23505: another call claimed today between our read and our write.
    // Whatever it chose is the day's message — return that, not ours.
    if (insertError.code === "23505") {
      const { data: winner } = await supabase
        .from("daily_sends")
        .select("article_id, message")
        .eq("sent_on", today)
        .maybeSingle();
      if (winner) {
        const w = winner as { article_id: string; message: string };
        return replay(request, articles, w.article_id, w.message, today);
      }
    }
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return send(request, {
    message,
    articleId: chosen.id,
    title: chosen.title,
    url: articleUrl(chosen.slug),
    author: chosen.author,
    publishedAt: chosen.publishedAt,
    summarySource: summary.text ? "openai" : "subtitle",
    messageChars: message.length,
    // Present only when the pitch fell back, so a silent degradation is
    // visible in the response rather than needing a log dive.
    ...(summary.error ? { summaryError: summary.error } : {}),
    sentOn: today,
    repeated: false,
  });
}
