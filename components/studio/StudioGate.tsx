"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { applyForMembership, cancelMembershipRequest } from "@/lib/membership";

/** Signing up is open to anyone, publishing is asked for. Everything under
 *  /studio goes through here; the matching RLS policies in
 *  `supabase/schema.sql` are what actually enforce it — this is only the
 *  explanation, and the place to ask.
 *
 *  Three doors, in the order a person meets them: signed out, signed in and
 *  reading, signed in and waiting. */
export function StudioGate({
  children,
  next = "/studio",
}: {
  children: React.ReactNode;
  next?: string;
}) {
  const { user, loading, canPublish } = useAuth();
  // The session is read once at sign-in, so an application made just now
  // lives here until the next load.
  const [appliedAt, setAppliedAt] = useState<string | null>(null);

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

  if (canPublish) return <>{children}</>;

  const waiting = Boolean(appliedAt ?? user.appliedAt);

  return waiting ? (
    <Waiting name={user.name} onCancel={() => setAppliedAt(null)} userId={user.id} />
  ) : (
    <Invitation
      name={user.name}
      initialNote={user.membershipNote ?? ""}
      userId={user.id}
      onApplied={(at) => setAppliedAt(at)}
    />
  );
}

/** A guest who has not asked yet. Say what the Studio is for and what being
 *  a member costs, then offer the form — a guest who only wanted to read
 *  should be able to leave without filling anything in. */
function Invitation({
  name,
  initialNote,
  userId,
  onApplied,
}: {
  name: string;
  initialNote: string;
  userId: string;
  onApplied: (at: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(initialNote);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    const res = await applyForMembership(userId, note);
    setBusy(false);
    if (res.ok) onApplied(new Date().toISOString());
    else setError(res.error ?? "신청하지 못했습니다.");
  }

  return (
    <div className="surface-dashed px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[52ch] text-center">
        <p className="t-label text-accent">Guest</p>
        <p className="t-h1 mt-4">Studio는 멤버만 이용할 수 있습니다</p>
        <p className="t-body mt-5 text-ink-muted">
          {name}님, 반갑습니다. 지금은 게스트라서 모든 아티클을 읽고 댓글을 남길 수
          있습니다. 글을 쓰려면 멤버가 되어야 하고, 멤버는 일주일에 한 편씩 각자 공부한
          내용을 정리해 발행합니다.
        </p>

        {!open ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => setOpen(true)}>
              멤버 신청하기
            </Button>
            <ButtonLink href="/articles" variant="secondary">
              아티클 읽기 →
            </ButtonLink>
          </div>
        ) : null}
      </div>

      {open && (
        <div className="surface mx-auto mt-10 max-w-[52ch] p-6 text-left sm:p-8">
          <label htmlFor="membership-note" className="t-label text-ink-muted">
            간단한 자기소개
          </label>
          <p className="t-caption mt-2 text-ink-faint">
            어떤 일을 하는지, 어떤 주제에 관심이 있는지 두세 문장이면 충분합니다.
          </p>
          <AutoTextarea
            id="membership-note"
            value={note}
            minRows={4}
            onChange={(e) => setNote(e.target.value)}
            placeholder="예) 프로덕트 디자이너로 일하고 있고, 인지부하와 온보딩에 관심이 많습니다. 읽은 것을 정리하는 습관을 들이고 싶어 신청합니다."
            className="field mt-4"
          />

          {error && <p className="t-caption mt-3 text-accent">{error}</p>}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <span className="t-caption text-ink-faint">
              운영자가 확인한 뒤 멤버로 전환해드립니다.
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="t-caption text-ink-faint underline underline-offset-4 hover:text-ink"
              >
                취소
              </button>
              <Button
                type="button"
                size="sm"
                onClick={submit}
                disabled={busy || note.trim().length < 10}
              >
                {busy ? "보내는 중…" : "신청 보내기"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Asked, and waiting for an answer. */
function Waiting({
  name,
  userId,
  onCancel,
}: {
  name: string;
  userId: string;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function cancel() {
    setBusy(true);
    await cancelMembershipRequest(userId);
    setBusy(false);
    onCancel();
  }

  return (
    <div className="surface-dashed px-6 py-24 text-center">
      <p className="t-label text-accent">Pending</p>
      <p className="t-h1 mt-4">승인을 기다리는 중입니다</p>
      <p className="t-body mx-auto mt-5 max-w-[42ch] text-ink-muted">
        {name}님의 신청이 운영자에게 전달되었습니다. 그동안에도 읽기와 댓글은 그대로
        쓸 수 있고, 멤버로 전환되면 이 화면이 바로 Studio로 열립니다.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/articles">아티클 읽기 →</ButtonLink>
        <ButtonLink href="/about" variant="secondary">
          스터디 소개
        </ButtonLink>
      </div>
      <button
        type="button"
        onClick={cancel}
        disabled={busy}
        className="t-caption mt-8 text-ink-faint underline underline-offset-4 hover:text-ink"
      >
        {busy ? "취소하는 중…" : "신청 취소"}
      </button>
    </div>
  );
}
