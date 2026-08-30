"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article, Role, User } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/Avatar";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

const ROLES: Role[] = ["guest", "member", "admin"];

const ROLE_NOTE: Record<Role, string> = {
  guest: "읽기 · 댓글",
  member: "읽기 · 댓글 · 발행",
  admin: "전체 권한 · 역할 관리",
};

export function AdminPanel({
  members,
  articles,
}: {
  members: User[];
  articles: Article[];
}) {
  const { user, loading, isAdmin, mode } = useAuth();
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (loading) {
    return <p className="t-caption py-24 text-center text-ink-faint">Loading…</p>;
  }

  if (!isAdmin) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">운영자 전용 화면입니다</p>
        <p className="t-body mt-4 text-ink-muted">
          이 화면은 role이 admin인 계정에만 열립니다.
        </p>
        <ButtonLink href="/studio" variant="secondary" className="mt-8">
          ← Studio
        </ButtonLink>
      </div>
    );
  }

  async function setRole(id: string, role: Role) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("데모 모드에서는 역할을 저장할 수 없습니다. Supabase를 연결해주세요.");
      return;
    }
    setPending(id);
    setError("");
    const { error: err } = await supabase.from("profiles").update({ role }).eq("id", id);
    setPending(null);
    if (err) setError(err.message);
    else router.refresh();
  }

  const counts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.authorId] = (acc[a.authorId] ?? 0) + 1;
    return acc;
  }, {});

  // A guest who never asked is not waiting for anything — they signed up to
  // read. Only the ones who applied belong in the count.
  const waiting = members.filter((m) => m.role === "guest" && m.appliedAt);

  return (
    <>
      {mode === "demo" && (
        <p className="surface-dashed t-caption px-4 py-3 text-ink-muted">
          데모 모드입니다. Supabase를 연결하기 전까지 역할 변경은 저장되지 않습니다.
        </p>
      )}
      {error && <p className="t-caption mt-4 text-accent">{error}</p>}

      {/* ── People ──────────────────────────────────── */}
      <section className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
          <h2 className="t-h2">People</h2>
          <p className="t-caption text-ink-faint">
            {members.length}명 · 승인 대기 {waiting.length}명
          </p>
        </div>

        <div>
          {members.map((m) => {
            const isSelf = m.id === user?.id;
            return (
              <div
                key={m.id}
                className="grid gap-4 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={m.name} src={m.profileImage} size="md" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/members/${m.handle}`}
                        className="t-body link-underline font-medium"
                      >
                        {m.name}
                      </Link>
                      {isSelf && (
                        <Chip tone="ghost" size="sm">
                          me
                        </Chip>
                      )}
                    </div>
                    <p className="t-caption mt-1 truncate text-ink-faint">
                      {m.email} · 가입 {formatDate(m.joinedAt)} · 글{" "}
                      {counts[m.id] ?? 0}편
                    </p>
                    {/* An application is the whole reason this screen exists:
                        show what they wrote, not just that they knocked. */}
                    {m.appliedAt && m.role === "guest" && (
                      <div className="mt-3 border-l-2 border-accent pl-3">
                        <p className="t-label text-accent">
                          멤버 신청 · {formatDate(m.appliedAt.slice(0, 10))}
                        </p>
                        <p className="t-caption mt-1.5 whitespace-pre-wrap text-ink-muted">
                          {m.membershipNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <div className="segmented">
                    {ROLES.map((r) => {
                      const active = m.role === r;
                      return (
                        <ChipButton
                          key={r}
                          size="sm"
                          tone={active ? "solid" : "outline"}
                          className={active ? "" : "border-transparent"}
                          aria-pressed={active}
                          /* Demoting yourself would lock the last admin out. */
                          disabled={isSelf || pending === m.id}
                          onClick={() => setRole(m.id, r)}
                        >
                          {r}
                        </ChipButton>
                      );
                    })}
                  </div>
                  <p className="t-caption text-ink-faint">{ROLE_NOTE[m.role]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Everything published ────────────────────── */}
      <section className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-4">
          <h2 className="t-h2">All articles</h2>
          <p className="t-caption text-ink-faint">
            {articles.length}편 · 초안{" "}
            {articles.filter((a) => a.status === "draft").length}편
          </p>
        </div>

        <div>
          {articles.map((a) => {
            const author = members.find((m) => m.id === a.authorId);
            return (
              <div
                key={a.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_7rem_6.5rem_11rem] sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="t-body truncate">{a.title || "제목 없음"}</p>
                  <p className="t-caption mt-1 truncate text-ink-faint sm:hidden">
                    {author?.name} · {formatDate(a.publishedAt)}
                  </p>
                </div>
                <span className="t-caption hidden truncate text-ink-muted sm:block">
                  {author?.name ?? "—"}
                </span>
                <span className="t-caption hidden text-ink-faint sm:block">
                  {formatDate(a.publishedAt)}
                </span>
                <div className="flex items-center justify-end gap-3">
                  <Chip tone={a.status === "published" ? "solid" : "outline"} size="sm">
                    {a.status}
                  </Chip>
                  <Link href={`/studio/${a.id}`} className="t-label link-underline">
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
