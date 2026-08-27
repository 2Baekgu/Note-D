import Link from "next/link";
import { cn } from "@/lib/utils";

/** Label + title + optional note/action. Every section on the site opens
 *  with this, above a hairline — no heavier rules anywhere. */
export function SectionHead({
  label,
  title,
  note,
  action,
  bare = false,
  className,
}: {
  label: string;
  title?: string;
  note?: string;
  action?: { label: string; href: string };
  /** Skip the built-in top rule — the page draws a full-bleed one instead. */
  bare?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(!bare && "border-t border-line", "pt-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="t-label text-accent">{label}</p>
          {title && <h2 className="t-display mt-3">{title}</h2>}
        </div>

        {(note || action) && (
          <div className="flex items-end gap-6">
            {note && <p className="t-caption max-w-[30ch] text-ink-faint">{note}</p>}
            {action && (
              <Link href={action.href} className="t-label link-underline whitespace-nowrap pb-1">
                {action.label} →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
