import { NextResponse } from "next/server";
import { suggestSlug } from "@/lib/slug-suggest";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Suggest a URL for an article being written.
 *
 *  Members only: the call costs money, and nobody outside the Studio has a
 *  title to name. */
export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "인증을 사용할 수 없습니다." }, { status: 503 });

  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", auth.user.id)
    .maybeSingle();

  const role = (profile as { role?: string } | null)?.role;
  if (role !== "admin" && role !== "member") {
    return NextResponse.json({ error: "멤버만 사용할 수 있습니다." }, { status: 403 });
  }

  let body: { title?: string; subtitle?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // Every address in use, so the model can steer around them rather than
  // land on one and leave the database to append a number.
  const { data: rows } = await supabase.from("articles").select("slug");
  const taken = (rows ?? []).map((r) => String((r as { slug: string }).slug));

  const { slug, error } = await suggestSlug(
    String(body.title ?? "").slice(0, 200),
    String(body.subtitle ?? "").slice(0, 300),
    taken,
  );
  return NextResponse.json({ slug, error: error ?? null });
}
