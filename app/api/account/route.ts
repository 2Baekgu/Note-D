import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Leaving.
 *
 *  Deleting the auth user is what actually ends an account: `profiles.id`
 *  references it and cascades, and everything the person wrote hangs off the
 *  profile the same way. That is the whole danger — one call would take an
 *  archive with it — so the two things worth protecting are checked here,
 *  where the caller cannot skip them.
 *
 *  The session decides whose account this is. Nothing in the request body
 *  names a user, so this cannot be pointed at somebody else. */
export async function DELETE() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "인증을 사용할 수 없습니다." }, { status: 503 });
  }

  const { data: auth } = await supabase.auth.getUser();
  const me = auth?.user;
  if (!me) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "서버 설정이 없습니다." }, { status: 503 });
  }

  // Articles outlive the person who wrote them: the study's archive is the
  // point of the site. Someone with writing here has to say what should
  // happen to it, and that is a conversation, not a button.
  const { count: articleCount } = await admin
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("author_id", me.id);

  if (articleCount && articleCount > 0) {
    return NextResponse.json(
      {
        error: `작성한 아티클이 ${articleCount}편 있어 바로 탈퇴할 수 없습니다. 운영자에게 문의해 주세요.`,
        articleCount,
      },
      { status: 409 },
    );
  }

  // Someone has to be able to approve the next member.
  const { data: mine } = await admin
    .from("profiles")
    .select("role")
    .eq("id", me.id)
    .maybeSingle();

  if ((mine as { role?: string } | null)?.role === "admin") {
    const { count: admins } = await admin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if ((admins ?? 0) <= 1) {
      return NextResponse.json(
        { error: "마지막 관리자는 탈퇴할 수 없습니다. 먼저 다른 멤버를 관리자로 지정해 주세요." },
        { status: 409 },
      );
    }
  }

  // Comments and reactions go with the profile, which goes with the user.
  const { error } = await admin.auth.admin.deleteUser(me.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
