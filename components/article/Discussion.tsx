"use client";

import { useState } from "react";
import type { Comment } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { relativeTime } from "@/lib/utils";

export function Discussion({
  articleId,
  initialComments,
}: {
  articleId: string;
  initialComments: Comment[];
}) {
  const { user, mode } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canPost = Boolean(user) && value.trim().length > 1 && !pending;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !canPost) return;
    setPending(true);
    setError(null);

    const draft: Comment = {
      id: `tmp-${Date.now()}`,
      articleId,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      content: value.trim(),
      createdAt: new Date().toISOString(),
    };

    // Optimistic — the thread should feel as light as a chat message.
    setComments((prev) => [...prev, draft]);
    setValue("");

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      const { error: dbError } = await supabase
        .from("comments")
        .insert({ article_id: articleId, author_id: user.id, content: draft.content });
      if (dbError) {
        setComments((prev) => prev.filter((c) => c.id !== draft.id));
        setValue(draft.content);
        setError(dbError.message);
      }
    }
    setPending(false);
  }

  return (
    <section className="section-gap" aria-labelledby="discussion">
      <div className="article-column">
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <h2 id="discussion" className="t-label text-accent">
            Discussion
          </h2>
          <span className="t-caption text-ink-faint">
            {String(comments.length).padStart(2, "0")} comments
          </span>
        </div>

        <ul className="mt-8 space-y-8">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-4">
              <Avatar name={c.authorName} src={c.authorImage} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="t-body font-semibold">{c.authorName}</span>
                  <span className="t-caption text-ink-faint">{relativeTime(c.createdAt)}</span>
                </div>
                <p className="t-body mt-2 whitespace-pre-wrap text-ink-muted">{c.content}</p>
              </div>
            </li>
          ))}

          {comments.length === 0 && (
            <li className="t-body py-6 text-ink-muted">
              아직 의견이 없습니다. 첫 번째로 생각을 남겨주세요.
            </li>
          )}
        </ul>

        <div className="surface mt-12 p-6">
          {user ? (
            <form onSubmit={submit}>
              <div className="flex gap-4">
                <Avatar name={user.name} src={user.image} size="md" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="comment" className="sr-only">
                    의견 남기기
                  </label>
                  <textarea
                    id="comment"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit(e);
                    }}
                    rows={3}
                    placeholder="이 글에 대해 짧게 이야기해주세요."
                    className="field field-bare resize-y"
                  />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="t-caption text-ink-faint">
                      {mode === "demo"
                        ? "데모 모드 — 이 댓글은 이 화면에서만 유지됩니다"
                        : "⌘ + Enter 로 등록"}
                    </span>
                    <Button type="submit" size="sm" disabled={!canPost}>
                      {pending ? "Posting…" : "Post"}
                    </Button>
                  </div>
                  {error && <p className="t-caption mt-3 text-accent">{error}</p>}
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="t-body text-ink-muted">댓글은 스터디 멤버만 남길 수 있습니다.</p>
              <ButtonLink href="/login" variant="secondary" size="sm">
                Sign in →
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
