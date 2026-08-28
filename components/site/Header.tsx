"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useAuth } from "@/components/auth/AuthProvider";
import { ButtonLink } from "@/components/ui/Button";
import { BlueprintFrame } from "./BlueprintFrame";
import { Wordmark } from "./Wordmark";
import { AccountMenu } from "./AccountMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    /* No `blueprint` here: that class sets `position: relative`, and because
       globals.css is unlayered while Tailwind's utilities are not, it beat
       `sticky` and quietly stopped the header from pinning. `sticky` is its
       own containing block, so the frame below positions against it anyway. */
    <header className="sticky top-0 z-50 border-b border-[var(--frame-line)] bg-paper">
      {/* The frame starts at the very top of the page. The corner squares
          straddle the header rule, so they belong to the header — drawn from
          the page below, the header background would clip their upper half. */}
      <BlueprintFrame corners="bottom" />

      <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={site.name}>
          <Wordmark className="text-[1.45rem]" />
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="nav-pill" aria-label="주요 메뉴">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-pill-item"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <ButtonLink href="/studio" size="sm">
                Studio
              </ButtonLink>
              <AccountMenu />
            </div>
          ) : (
            <ButtonLink href="/login" variant="secondary" size="sm">
              Sign in
            </ButtonLink>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="t-label -mr-1 flex items-center gap-2 px-2 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
          <span className="flex h-3 w-4 flex-col justify-between" aria-hidden="true">
            <span
              className={cn(
                "block h-px w-full bg-current transition-transform duration-[var(--duration-base)] ease-out-quint",
                open && "translate-y-[5.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-full bg-current transition-opacity duration-[var(--duration-fast)]",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-full bg-current transition-transform duration-[var(--duration-base)] ease-out-quint",
                open && "-translate-y-[5.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-paper px-[calc(var(--gutter)+var(--cell-pad))] pb-12 pt-8 shadow-float transition-all duration-[var(--duration-base)] ease-out-quint md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col" aria-label="모바일 메뉴">
          {[{ label: "Index", href: "/" }, ...site.nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="t-h1 flex items-baseline justify-between border-b border-line py-6"
            >
              {item.label}
              <span className="t-label text-ink-faint">{String(i).padStart(2, "0")}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          {user ? (
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/studio" onClick={close}>
                Studio
              </ButtonLink>
              {isAdmin && (
                <Link href="/studio/admin" onClick={close} className="t-label link-underline">
                  멤버 관리
                </Link>
              )}
              <button
                type="button"
                onClick={signOut}
                className="t-label ml-auto text-ink-muted"
              >
                Sign out — {user.name}
              </button>
            </div>
          ) : (
            <ButtonLink href="/login" variant="secondary" onClick={close}>
              Sign in
            </ButtonLink>
          )}
        </div>

        <p className="t-body mt-12 max-w-[30ch] text-ink-muted">{site.tagline}</p>
      </div>
    </header>
  );
}
