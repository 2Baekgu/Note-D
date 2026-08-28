"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/studio/admin", label: "멤버 관리" },
  { href: "/studio/admin/reports", label: "버그 리포트" },
];

/** The admin screens are one place with two rooms. This is the door between
 *  them, so neither has to be reached through the avatar menu twice. */
export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="관리자 메뉴">
      {TABS.map((tab) => {
        const here = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={here ? "page" : undefined}
            className={cn("chip chip-sm", here ? "chip-solid" : "chip-outline")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
