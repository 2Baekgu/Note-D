import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPreview, safeUrl } from "@/lib/link-preview";

/** Open Graph for a link the editor is about to turn into a card. Members
 *  only, because this fetches a URL the caller chose. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await getSupabaseServerClient();
  const { data } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
  if (!data?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const target = safeUrl(new URL(request.url).searchParams.get("url") ?? "");
  if (!target) {
    return NextResponse.json({ error: "열 수 없는 주소입니다." }, { status: 400 });
  }

  return NextResponse.json(await fetchPreview(target));
}
