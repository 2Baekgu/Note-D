import { NextResponse } from "next/server";
import { buildMessage, pickDaily, seoulDay, type DailyArticle } from "@/lib/daily-pick";
import { summarise } from "@/lib/summary";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tomorrow's message, without sending or recording it.
 *
 *  The same pick, the same prompt, the same assembly the Shortcut gets — only
 *  the write to `daily_sends` is missing, so reading this never costs the
 *  queue a day.
 *
 *  An admin's own session is the key. There is nothing to paste and no token
 *  to hand around: the person who may read this is already signed in as the
 *  person who may read it. */
export async function GET(request: Request) {
  const auth = await getSupabaseServerClient();
  if (!auth) return NextResponse.json({ error: "인증을 사용할 수 없습니다." }, { status: 503 });

  const { data: session } = await auth.auth.getUser();
  if (!session?.user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { data: profile } = await auth
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .maybeSingle();
  if ((profile as { role?: string } | null)?.role !== "admin") {
    return NextResponse.json({ error: "관리자만 볼 수 있습니다." }, { status: 403 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: "서버 설정이 없습니다." }, { status: 503 });

  const [{ data: articleRows }, { data: sendRows }] = await Promise.all([
    supabase
      .from("articles")
      .select("id, title, slug, subtitle, content, published_at, profiles(name)")
      .eq("status", "published"),
    supabase.from("daily_sends").select("article_id, sent_on"),
  ]);

  const articles: DailyArticle[] = (articleRows ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const profileRow = (r.profiles ?? {}) as { name?: string };
    return {
      id: String(r.id ?? ""),
      title: String(r.title ?? ""),
      slug: String(r.slug ?? ""),
      subtitle: String(r.subtitle ?? ""),
      content: String(r.content ?? ""),
      publishedAt: String(r.published_at ?? "").slice(0, 10),
      author: profileRow.name ?? "Note:D",
    };
  });
  if (!articles.length) {
    return NextResponse.json({ error: "발행된 아티클이 없습니다." }, { status: 404 });
  }

  const lastSent = new Map<string, string>();
  for (const row of (sendRows ?? []) as { article_id: string; sent_on: string }[]) {
    const prev = lastSent.get(row.article_id);
    if (!prev || row.sent_on > prev) lastSent.set(row.article_id, row.sent_on);
  }

  // Which day to preview: tomorrow by default, since that is the one nobody
  // has seen. `?day=today` shows what today's run would have said.
  const url = new URL(request.url);
  const when =
    url.searchParams.get("day") === "today"
      ? new Date()
      : new Date(Date.now() + 86_400_000);

  const pick = pickDaily(articles, lastSent, when);
  if (!pick) return NextResponse.json({ error: "보낼 아티클이 없습니다." }, { status: 404 });

  const { text, error } = await summarise(pick.title, pick.content, 500);
  const message = buildMessage(pick, text ?? pick.subtitle);

  // Plain text by default: this is read, not parsed.
  if (url.searchParams.get("format") === "json") {
    return NextResponse.json({
      for: seoulDay(when),
      title: pick.title,
      slug: pick.slug,
      chars: message.length,
      summaryError: error ?? null,
      message,
    });
  }

  const header = [
    `── ${seoulDay(when)} 예정 · ${message.length}자 ──`,
    error ? `⚠️ 요약 실패: ${error}` : "",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  return new NextResponse(`${header}\n${message}\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
