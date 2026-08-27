"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { members } from "@/lib/data/members";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export function LoginPanel() {
  const { user, mode, canPublish, signInWithGoogle, signInAsDemoMember, signOut } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/studio";

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="surface p-8 sm:p-12">
        <p className="t-label text-ink-faint">Signed in as</p>
        <div className="mt-6 flex items-center gap-4">
          <Avatar name={user.name} src={user.image} size="lg" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="t-h2">{user.name}</p>
              <Chip tone={user.role === "guest" ? "outline" : "solid"} size="sm">
                {user.role}
              </Chip>
            </div>
            <p className="t-caption mt-2 truncate text-ink-muted">{user.email}</p>
          </div>
        </div>

        {!canPublish && (
          <p className="surface-dashed t-caption mt-8 px-4 py-3 text-ink-muted">
            읽기와 댓글은 바로 쓸 수 있습니다. 글을 발행하려면 운영자가 멤버로
            승인해야 해요.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={canPublish ? next : "/articles"}>
            {canPublish ? "Go to Studio →" : "아티클 읽으러 가기 →"}
          </ButtonLink>
          <Button variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="surface p-8 sm:p-12">
      <Button
        className="w-full"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError("");
          const res = await signInWithGoogle();
          if (res.error) {
            setError(res.error);
            setBusy(false);
          }
          // On success the browser leaves for Google; nothing to reset.
        }}
      >
        <span aria-hidden="true">G</span>
        {busy ? "이동 중…" : "Continue with Google"}
      </Button>

      <p className="t-caption mt-6 text-ink-muted">
        따로 가입 절차는 없습니다. 처음 로그인하면 멤버 프로필이 자동으로
        만들어지고, 바로 읽고 댓글을 남길 수 있어요. 글을 발행하려면 운영자
        승인이 필요합니다.
      </p>

      {error && <p className="t-caption mt-4 text-accent">{error}</p>}

      {mode === "demo" && (
        <div className="mt-8 border-t border-line pt-6">
          <p className="t-label text-ink-faint">Demo mode</p>
          <p className="t-caption mt-3 text-ink-muted">
            Supabase가 아직 연결되지 않아 로컬 데모 모드로 동작합니다. 멤버를 선택하면 바로
            작성·댓글 기능을 확인할 수 있어요.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {members.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    signInAsDemoMember(m.id);
                    router.push(next);
                  }}
                  className="flex w-full items-center gap-3 rounded-pill border border-line px-3 py-2 text-left transition-colors duration-[var(--duration-base)] ease-out-quint hover:border-ink"
                >
                  <Avatar name={m.name} src={m.profileImage} size="sm" />
                  <span className="min-w-0">
                    <span className="t-body block truncate font-medium leading-tight">{m.name}</span>
                    <span className="t-caption block truncate text-ink-faint">{m.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
