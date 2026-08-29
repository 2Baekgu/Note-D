"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Article, User } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";
import { deleteArticle, loadLocalArticles } from "@/lib/studio";
import { formatDate } from "@/lib/utils";

type Tab = "all" | "published" | "draft";

export function StudioDashboard({
  serverArticles,
  members,
}: {
  serverArticles: Article[];
  /** The real roster. Author ids are database uuids, so looking them up in
   *  the sample roster found nothing and every row showed a "?". */
  members: User[];
}) {
  const { user, mode, isAdmin } = useAuth();
  const router = useRouter();
  const [local, setLocal] = useState<Article[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  // You open the Studio to look after your own writing, so that is the view
  // it opens on. The chip stays right there to widen it.
  const [mine, setMine] = useState(true);
  // Deleting is not undoable, so the button asks once before it does it.
  const [confirming, setConfirming] = useState<string | null>(null);
  const [gone, setGone] = useState<string[]>([]);
  const [failed, setFailed] = useState<string | null>(null);

  async function remove(id: string) {
    setFailed(null);
    const res = await deleteArticle(id);
    setConfirming(null);
    if (!res.ok) {
      setFailed(res.error ?? "삭제하지 못했습니다.");
      return;
    }
    setGone((list) => [...list, id]);
    setLocal(loadLocalArticles());
    router.refresh();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- local drafts are only readable after hydration
    setLocal(loadLocalArticles());
  }, []);

  const all = useMemo(() => {
    const seen = new Set(local.map((a) => a.id));
    return [...local, ...serverArticles.filter((a) => !seen.has(a.id))].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    );
  }, [local, serverArticles]);

  const rows = all.filter((a) => {
    if (gone.includes(a.id)) return false;
    if (tab !== "all" && a.status !== tab) return false;
    if (mine && user && a.authorId !== user.id) return false;
    return true;
  });

  const counts = {
    all: all.length,
    published: all.filter((a) => a.status === "published").length,
    draft: all.filter((a) => a.status === "draft").length,
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="segmented">
          {(["all", "published", "draft"] as const).map((t) => (
            <ChipButton
              key={t}
              tone={tab === t ? "solid" : "outline"}
              className={tab === t ? "" : "border-transparent"}
              count={counts[t]}
              onClick={() => setTab(t)}
            >
              {t === "all" ? "All" : t === "published" ? "Published" : "Drafts"}
            </ChipButton>
          ))}
        </div>

        <div className="segmented">
          <ChipButton
            tone={mine ? "solid" : "outline"}
            className={mine ? "" : "border-transparent"}
            onClick={() => setMine((v) => !v)}
          >
            내 글만
          </ChipButton>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isAdmin && (
            <ButtonLink href="/studio/admin" variant="secondary">
              멤버 관리
            </ButtonLink>
          )}
          <ButtonLink href="/studio/new">+ New article</ButtonLink>
        </div>
      </div>

      {mode === "demo" && (
        <p className="surface-dashed t-caption mt-6 px-4 py-3 text-ink-muted">
          데모 모드로 실행 중입니다. Supabase 환경변수를 연결하기 전까지 새로 작성한 글은 이
          브라우저에만 저장되고 공개 목록에는 나타나지 않습니다.
        </p>
      )}

      {failed && <p className="t-caption mt-4 text-accent">{failed}</p>}

      <div className="mt-8 border-t border-line">
        {rows.map((a) => {
          const author = members.find((m) => m.id === a.authorId);
          const isLocal = a.id.startsWith("local-");
          // Matches the RLS policy: your own, or anything if you are an admin.
          // A local draft has no author yet and belongs to whoever wrote it.
          const canEdit = isAdmin || isLocal || a.authorId === user?.id;
          return (
            <div
              key={a.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-line py-6 sm:grid-cols-[minmax(0,1fr)_8rem_7rem_9rem] sm:items-center sm:gap-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={a.status === "published" ? "solid" : "outline"} size="sm">
                    {a.status}
                  </Chip>
                  {isLocal && (
                    <Chip tone="outline" size="sm" className="border-dashed">
                      local
                    </Chip>
                  )}
                </div>
                {a.status === "published" && !isLocal ? (
                  <Link href={`/articles/${a.slug}`} className="mt-3 block">
                    <span className="t-h3 link-underline">{a.title || "제목 없음"}</span>
                  </Link>
                ) : (
                  <p className="t-h3 mt-3">{a.title || "제목 없음"}</p>
                )}
                <p className="t-caption mt-1 line-clamp-1 text-ink-muted">{a.subtitle}</p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <Avatar name={author?.name ?? "—"} src={author?.profileImage} size="sm" />
                <span className="t-caption truncate text-ink-muted">
                  {author?.name ?? "—"}
                </span>
              </div>

              <span className="t-caption hidden text-ink-faint sm:block">
                {formatDate(a.publishedAt)}
              </span>

              <div className="flex items-center gap-3 sm:justify-end">
                {canEdit && (
                  <Link href={`/studio/${a.id}`} className="t-label link-underline">
                    Edit
                  </Link>
                )}
                {canEdit &&
                  (confirming === a.id ? (
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => remove(a.id)}
                        className="t-label text-accent underline underline-offset-4"
                      >
                        정말 삭제
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(null)}
                        className="t-label text-ink-faint underline underline-offset-4"
                      >
                        취소
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirming(a.id)}
                      className="t-label text-ink-faint transition-colors duration-[var(--duration-base)] hover:text-accent"
                    >
                      Delete
                    </button>
                  ))}
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="px-6 py-24 text-center">
            <p className="t-h2">
              {mine && all.length > 0 ? "내가 쓴 글이 없습니다" : "아직 글이 없습니다"}
            </p>
            {mine && all.length > 0 && (
              <button
                type="button"
                onClick={() => setMine(false)}
                className="t-label link-underline mt-4 text-ink-muted"
              >
                전체 글 보기
              </button>
            )}
            <div>
              <ButtonLink href="/studio/new" variant="secondary" className="mt-6">
                첫 아티클 쓰기 →
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
