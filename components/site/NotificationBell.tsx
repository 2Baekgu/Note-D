"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Notification } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { markNotificationsRead } from "@/lib/discussion";
import { relativeTime, cn } from "@/lib/utils";

/** What happened on your writing while you were away.
 *
 *  The rows are written by database triggers when someone comments or reacts,
 *  so they arrive however the comment was left — and cannot be forged, since
 *  nothing but those triggers may insert one. */
export function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let alive = true;
    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*, profiles!notifications_actor_id_fkey(name, profile_image), articles(title, slug)")
        .order("created_at", { ascending: false })
        .limit(30);
      if (!alive || !data) return;
      setItems(
        data.map((row: Record<string, unknown>) => {
          const actor = (row.profiles ?? {}) as Record<string, unknown>;
          const article = (row.articles ?? {}) as Record<string, unknown>;
          return {
            id: String(row.id ?? ""),
            type: (row.type as Notification["type"]) ?? "comment",
            actorName: String(actor.name ?? "누군가"),
            actorImage: (actor.profile_image as string | null) ?? null,
            articleTitle: String(article.title ?? ""),
            articleSlug: String(article.slug ?? ""),
            emoji: (row.emoji as string | null) ?? null,
            readAt: (row.read_at as string | null) ?? null,
            createdAt: String(row.created_at ?? ""),
          };
        }),
      );
    };

    void load();
    // Cheap enough for a study of three, and it means a reply shows up while
    // the tab is open rather than only on the next navigation.
    const timer = window.setInterval(load, 60_000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [user]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const unread = items.filter((n) => !n.readAt);

  function openList() {
    setOpen((v) => !v);
    if (open || !unread.length) return;
    // Seen is seen: mark them on the way in, and grey them immediately.
    const ids = unread.map((n) => n.id);
    setItems((prev) =>
      prev.map((n) => (ids.includes(n.id) ? { ...n, readAt: new Date().toISOString() } : n)),
    );
    void markNotificationsRead(ids);
  }

  const line = (n: Notification) =>
    n.type === "reaction"
      ? `${n.actorName}님이 내 댓글에 ${n.emoji ?? "반응"}을 남겼어요`
      : n.type === "reply"
        ? `${n.actorName}님이 내 댓글에 답글을 남겼어요`
        : `${n.actorName}님이 내 글에 댓글을 남겼어요`;

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={openList}
        aria-label={unread.length ? `알림 ${unread.length}개` : "알림"}
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-pill text-ink-muted transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.06)] hover:text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
          <path d="M10.5 20a2 2 0 0 0 3 0" />
        </svg>
        {unread.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="surface absolute right-0 top-[calc(100%+0.5rem)] z-50 w-80 overflow-hidden py-1 shadow-float"
        >
          <p className="t-label border-b border-line px-4 pb-2 pt-2 text-ink-faint">알림</p>
          {items.length === 0 ? (
            <p className="t-caption px-4 py-6 text-center text-ink-faint">아직 알림이 없습니다.</p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {items.map((n) => (
                <li key={n.id}>
                  <Link
                    href={`/articles/${encodeURIComponent(n.articleSlug)}#discussion`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex gap-3 px-4 py-3 transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.04)]",
                      !n.readAt && "bg-[rgba(232,69,42,0.04)]",
                    )}
                  >
                    <Avatar name={n.actorName} src={n.actorImage} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="t-caption block text-ink">{line(n)}</span>
                      <span className="t-caption mt-0.5 block truncate text-ink-faint">
                        {n.articleTitle}
                      </span>
                      <span className="t-caption mt-0.5 block text-ink-faint">
                        {relativeTime(n.createdAt)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
