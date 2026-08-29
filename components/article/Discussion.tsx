"use client";

import { useMemo, useState } from "react";
import type { Comment } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import {
  editComment,
  postComment,
  removeComment,
  toggleReaction,
} from "@/lib/discussion";
import { relativeTime, cn } from "@/lib/utils";

/** Enough to answer with, few enough to choose from without thinking. */
const EMOJI = ["👍", "🙌", "🔥", "💡", "🤔", "😂", "👀", "❤️"];

export function Discussion({
  articleId,
  initialComments,
}: {
  articleId: string;
  initialComments: Comment[];
}) {
  const { user, mode } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [error, setError] = useState<string | null>(null);
  /** Which comment has the reply box open under it. */
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  // One level of nesting: an answer to an answer still hangs off the top
  // comment, so a thread never walks off the right edge.
  const threads = useMemo(() => {
    const roots = comments.filter((c) => !c.parentId);
    return roots.map((root) => ({
      root,
      replies: comments.filter((c) => c.parentId === root.id),
    }));
  }, [comments]);

  const patch = (id: string, next: Partial<Comment>) =>
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...next } : c)),
    );

  async function send(content: string, parentId: string | null) {
    if (!user) return;
    const body = content.trim();
    if (body.length < 2) return;

    const draft: Comment = {
      id: `tmp-${Date.now()}`,
      articleId,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      content: body,
      createdAt: new Date().toISOString(),
      parentId,
      updatedAt: null,
      reactions: [],
    };
    // Optimistic — the thread should feel as light as a chat message.
    setComments((prev) => [...prev, draft]);
    setError(null);

    const res = await postComment(articleId, user.id, body, parentId);
    if (!res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== draft.id));
      setError(res.error ?? "남기지 못했습니다.");
      return;
    }
    if (res.id) patch(draft.id, { id: res.id });
  }

  async function saveEdit(id: string, content: string) {
    const body = content.trim();
    if (!body) return;
    const before = comments.find((c) => c.id === id);
    patch(id, { content: body, updatedAt: new Date().toISOString() });
    setEditing(null);

    const res = await editComment(id, body);
    if (!res.ok && before) {
      patch(id, { content: before.content, updatedAt: before.updatedAt });
      setError(res.error ?? "고치지 못했습니다.");
    }
  }

  async function destroy(id: string) {
    const before = comments;
    // A reply left under a deleted comment would be an orphan; the database
    // cascades the same way.
    setComments((prev) => prev.filter((c) => c.id !== id && c.parentId !== id));
    setConfirming(null);

    const res = await removeComment(id);
    if (!res.ok) {
      setComments(before);
      setError(res.error ?? "지우지 못했습니다.");
    }
  }

  async function react(comment: Comment, emoji: string) {
    if (!user) return;
    const had = comment.reactions.some((r) => r.emoji === emoji && r.mine);
    const next = had
      ? comment.reactions
          .map((r) =>
            r.emoji === emoji ? { ...r, count: r.count - 1, mine: false } : r,
          )
          .filter((r) => r.count > 0)
      : comment.reactions.some((r) => r.emoji === emoji)
        ? comment.reactions.map((r) =>
            r.emoji === emoji ? { ...r, count: r.count + 1, mine: true } : r,
          )
        : [...comment.reactions, { emoji, count: 1, mine: true }];

    patch(comment.id, { reactions: next });
    const res = await toggleReaction(comment.id, user.id, emoji, had);
    if (!res.ok) {
      patch(comment.id, { reactions: comment.reactions });
      setError(res.error ?? "반응을 남기지 못했습니다.");
    }
  }

  const rowProps = {
    currentUserId: user?.id ?? null,
    editing,
    confirming,
    replyTo,
    onReact: react,
    onReply: (id: string) => setReplyTo((v) => (v === id ? null : id)),
    onEdit: setEditing,
    onSaveEdit: saveEdit,
    onConfirm: setConfirming,
    onDelete: destroy,
    onSend: async (content: string, parentId: string) => {
      await send(content, parentId);
      setReplyTo(null);
    },
  };

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
          {threads.map(({ root, replies }) => (
            <li key={root.id}>
              <CommentRow comment={root} {...rowProps} />
              {replies.length > 0 && (
                <ul className="mt-5 space-y-5 border-l border-line pl-4 sm:pl-6">
                  {replies.map((r) => (
                    <li key={r.id}>
                      <CommentRow comment={r} isReply {...rowProps} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {comments.length === 0 && (
            <li className="t-body py-6 text-ink-muted">
              아직 의견이 없습니다. 첫 번째로 생각을 남겨주세요.
            </li>
          )}
        </ul>

        {error && <p className="t-caption mt-6 text-accent">{error}</p>}

        <div className="surface mt-12 p-6">
          {user ? (
            <div className="flex gap-4">
              <Avatar name={user.name} src={user.image} size="md" />
              <div className="min-w-0 flex-1">
                <Composer
                  label="의견 남기기"
                  placeholder="이 글에 대해 짧게 이야기해주세요."
                  note={
                    mode === "demo"
                      ? "데모 모드 — 이 댓글은 이 화면에서만 유지됩니다"
                      : "⌘ + Enter 로 등록"
                  }
                  onSubmit={(v) => send(v, null)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="t-body text-ink-muted">
                댓글은 스터디 멤버만 남길 수 있습니다.
              </p>
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

/** Shared by the actions under every comment: quiet until you look for them. */
const ACTION =
  "t-caption text-ink-faint underline underline-offset-4 hover:text-ink";

function CommentRow({
  comment: c,
  isReply,
  currentUserId,
  editing,
  confirming,
  replyTo,
  onReact,
  onReply,
  onEdit,
  onSaveEdit,
  onConfirm,
  onDelete,
  onSend,
}: {
  comment: Comment;
  isReply?: boolean;
  currentUserId: string | null;
  editing: string | null;
  confirming: string | null;
  replyTo: string | null;
  onReact: (comment: Comment, emoji: string) => void;
  onReply: (id: string) => void;
  onEdit: (id: string | null) => void;
  onSaveEdit: (id: string, content: string) => void;
  onConfirm: (id: string | null) => void;
  onDelete: (id: string) => void;
  onSend: (content: string, parentId: string) => Promise<void>;
}) {
  const mine = currentUserId === c.authorId;
  const signedIn = Boolean(currentUserId);

  return (
    <div className="flex gap-3 sm:gap-4">
      <Avatar
        name={c.authorName}
        src={c.authorImage}
        size={isReply ? "sm" : "md"}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="t-body font-semibold">{c.authorName}</span>
          <span className="t-caption text-ink-faint">
            {relativeTime(c.createdAt)}
          </span>
          {c.updatedAt && (
            <span className="t-caption text-ink-faint">· 수정됨</span>
          )}
        </div>

        {editing === c.id ? (
          <EditBox
            initial={c.content}
            onCancel={() => onEdit(null)}
            onSave={(v) => onSaveEdit(c.id, v)}
          />
        ) : (
          <p className="t-body mt-2 whitespace-pre-wrap text-ink-muted">
            {c.content}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {c.reactions.map((r) => (
            <button
              key={r.emoji}
              type="button"
              disabled={!signedIn}
              onClick={() => onReact(c, r.emoji)}
              aria-pressed={r.mine}
              className={cn(
                "flex items-center gap-1 rounded-pill border px-2 py-0.5 text-[0.8125rem] transition-colors duration-[var(--duration-fast)]",
                r.mine
                  ? "border-ink bg-[rgba(22,21,15,0.05)]"
                  : "border-line hover:border-ink",
              )}
            >
              <span>{r.emoji}</span>
              <span className="t-caption text-ink-muted">{r.count}</span>
            </button>
          ))}

          {signedIn && <EmojiPicker onPick={(e) => onReact(c, e)} />}

          {signedIn && !isReply && (
            <button
              type="button"
              onClick={() => onReply(c.id)}
              className={cn(ACTION, "ml-1")}
            >
              답글
            </button>
          )}

          {mine && editing !== c.id && (
            <>
              <button
                type="button"
                onClick={() => onEdit(c.id)}
                className={ACTION}
              >
                수정
              </button>
              {confirming === c.id ? (
                <>
                  <button
                    type="button"
                    onClick={() => onDelete(c.id)}
                    className="t-caption text-accent underline underline-offset-4"
                  >
                    정말 삭제
                  </button>
                  <button
                    type="button"
                    onClick={() => onConfirm(null)}
                    className={ACTION}
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onConfirm(c.id)}
                  className={cn(ACTION, "hover:text-accent")}
                >
                  삭제
                </button>
              )}
            </>
          )}
        </div>

        {replyTo === c.id && signedIn && (
          <div className="surface mt-4 p-4">
            <Composer
              compact
              autoFocus
              label={`${c.authorName}에게 답글`}
              placeholder={`${c.authorName}에게 답글 남기기`}
              submitLabel="답글"
              onSubmit={(v) => onSend(v, c.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Composer({
  label,
  placeholder,
  note,
  compact,
  autoFocus,
  submitLabel = "Post",
  onSubmit,
}: {
  label: string;
  placeholder: string;
  note?: string;
  compact?: boolean;
  autoFocus?: boolean;
  submitLabel?: string;
  onSubmit: (value: string) => void | Promise<void>;
}) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const ready = value.trim().length > 1 && !pending;

  async function go() {
    if (!ready) return;
    setPending(true);
    await onSubmit(value);
    setValue("");
    setPending(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void go();
      }}
    >
      <AutoTextarea
        value={value}
        autoFocus={autoFocus}
        aria-label={label}
        minRows={compact ? 2 : 3}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            void go();
          }
        }}
        placeholder={placeholder}
        className="field field-bare"
      />
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 border-t border-line",
          compact ? "mt-2 pt-2" : "mt-4 pt-4",
        )}
      >
        <span className="t-caption text-ink-faint">{note}</span>
        <Button type="submit" size="sm" disabled={!ready}>
          {pending ? "Posting…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function EditBox({
  initial,
  onSave,
  onCancel,
}: {
  initial: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="mt-2">
      <AutoTextarea
        autoFocus
        value={value}
        minRows={2}
        aria-label="댓글 수정"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") onSave(value);
        }}
        className="field"
      />
      <div className="mt-2 flex items-center gap-3">
        <Button type="button" size="sm" onClick={() => onSave(value)}>
          저장
        </Button>
        <button type="button" onClick={onCancel} className={ACTION}>
          취소
        </button>
      </div>
    </div>
  );
}

function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <button
        type="button"
        aria-label="반응 남기기"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        className="flex h-[22px] items-center rounded-pill border border-line px-2 text-[0.8125rem] leading-none text-ink-faint transition-colors duration-[var(--duration-fast)] hover:border-ink hover:text-ink"
      >
        ＋
      </button>
      {open && (
        <span className="surface absolute left-0 top-[calc(100%+0.35rem)] z-30 flex gap-0.5 p-1.5 shadow-float">
          {EMOJI.map((e) => (
            <button
              key={e}
              type="button"
              // Keep the picker's own blur from closing it before the click.
              onMouseDown={(ev) => ev.preventDefault()}
              onClick={() => {
                onPick(e);
                setOpen(false);
              }}
              className="rounded-sm px-1.5 py-1 text-[1rem] leading-none transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.06)]"
            >
              {e}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}
