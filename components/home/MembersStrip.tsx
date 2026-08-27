import Link from "next/link";
import type { User } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";

export function MembersStrip({
  members,
  counts,
}: {
  members: User[];
  counts: Record<string, number>;
}) {
  return (
    <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <li key={m.id} className="bg-paper">
          <Link
            href={`/members/${m.handle}`}
            className="group flex h-full items-start gap-4 bg-paper p-6 transition-colors duration-[var(--duration-base)] ease-out-quint hover:bg-surface"
          >
            <Avatar name={m.name} src={m.profileImage} size="lg" />
            <span className="min-w-0 flex-1">
              <span className="t-h3 block transition-colors duration-[var(--duration-base)] group-hover:text-accent">
                {m.name}
              </span>
              <span className="t-label mt-2 block text-ink-faint">{m.title}</span>
              <span className="t-caption mt-3 line-clamp-2 block text-ink-muted">{m.bio}</span>
            </span>
            <span className="t-caption shrink-0 text-ink-faint">
              {String(counts[m.id] ?? 0).padStart(2, "0")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
