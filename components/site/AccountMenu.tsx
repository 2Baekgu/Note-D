"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

/** The avatar used to sign you out on a single click, which is a hard action
 *  to undo and easy to hit by accident. It opens this instead — and it is
 *  also where the admin screens are reachable from. */
export function AccountMenu() {
  const { user, isAdmin, canPublish, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const close = () => setOpen(false);
  const itemClass =
    "t-body flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.04)]";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center rounded-pill"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${user.name} 계정 메뉴`}
      >
        <Avatar name={user.name} src={user.image} size="md" />
      </button>

      {open && (
        <div
          role="menu"
          className="surface absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden py-2 shadow-float"
        >
          <div className="border-b border-line px-4 pb-3 pt-1">
            <div className="flex items-center gap-2">
              <p className="t-body truncate font-medium">{user.name}</p>
              <Chip tone={isAdmin ? "solid" : "outline"} size="sm">
                {user.role}
              </Chip>
            </div>
            <p className="t-caption mt-1 truncate text-ink-faint">{user.email}</p>
          </div>

          <div className="pt-2">
            <Link
              href={`/members/${user.handle}`}
              onClick={close}
              className={itemClass}
              role="menuitem"
            >
              내 프로필
            </Link>

            {/* No Studio entry: the header's own button is right beside this. */}
            {!canPublish && (
              <p className="t-caption px-4 py-2.5 text-ink-faint">
                글을 쓰려면 운영자 승인이 필요합니다.
              </p>
            )}

            {isAdmin && (
              <Link
                href="/studio/admin"
                onClick={close}
                className={cn(itemClass, pathname === "/studio/admin" && "text-accent")}
                role="menuitem"
              >
                멤버 관리
                <span className="t-label text-ink-faint">Admin</span>
              </Link>
            )}
          </div>

          <div className="mt-2 border-t border-line pt-2">
            <button
              type="button"
              onClick={() => {
                close();
                void signOut();
              }}
              className={cn(itemClass, "w-full")}
              role="menuitem"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
