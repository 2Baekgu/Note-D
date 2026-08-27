import Link from "next/link";
import { topics } from "@/lib/data/topics";

export function TopicsIndex({ counts }: { counts: Record<string, number> }) {
  return (
    <ul className="mt-12 grid gap-x-12 border-t border-line lg:grid-cols-2">
      {topics.map((c, i) => {
        const count = counts[c.slug] ?? 0;
        return (
          <li key={c.slug} className="border-b border-line">
            <Link href={`/articles?topic=${c.slug}`} className="group flex items-center gap-6 py-6">
              <span className="t-caption w-6 shrink-0 text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="t-h1 block transition-colors duration-[var(--duration-base)] ease-out-quint group-hover:text-accent">
                  {c.name}
                </span>
                <span className="t-caption mt-2 block max-h-0 overflow-hidden text-ink-muted opacity-0 transition-all duration-[var(--duration-base)] ease-out-quint group-hover:max-h-12 group-hover:opacity-100">
                  {c.description}
                </span>
              </span>

              <span className="t-caption shrink-0 text-ink-faint">
                {count > 0 ? String(count).padStart(2, "0") : "—"}
              </span>
              <span
                className="shrink-0 text-ink-faint transition-all duration-[var(--duration-base)] ease-out-quint group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
