"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { ButtonLink } from "@/components/ui/Button";

/** Signing up is open to anyone, publishing is not. Everything under /studio
 *  goes through here; the matching RLS policies in `supabase/schema.sql` are
 *  what actually enforce it — this is only the explanation. */
export function StudioGate({
  children,
  next = "/studio",
}: {
  children: React.ReactNode;
  next?: string;
}) {
  const { user, loading, canPublish } = useAuth();

  if (loading) {
    return <p className="t-caption py-24 text-center text-ink-faint">Loading…</p>;
  }

  if (!user) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">Studio는 멤버 전용입니다</p>
        <p className="t-body mt-4 text-ink-muted">
          구글 계정으로 로그인하면 아티클을 작성하고 발행 상태를 관리할 수 있습니다.
        </p>
        <ButtonLink href={`/login?next=${encodeURIComponent(next)}`} className="mt-8">
          Sign in →
        </ButtonLink>
      </div>
    );
  }

  if (!canPublish) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">승인을 기다리는 중입니다</p>
        <p className="t-body mx-auto mt-4 max-w-[42ch] text-ink-muted">
          {user.name}님, 반갑습니다. 지금은 게스트라서 읽기와 댓글까지 가능합니다.
          글을 쓰고 싶다면 운영자에게 알려주세요 — 멤버로 바꿔드리면 이 화면이 바로
          Studio로 열립니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/articles">아티클 읽기 →</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            스터디 소개
          </ButtonLink>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
