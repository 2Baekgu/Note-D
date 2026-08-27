import { cn } from "@/lib/utils";

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("overflow-hidden border-y border-line bg-accent py-3 text-on-accent", className)}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="t-label flex shrink-0 items-center px-6">
            {item}
            <span className="ml-6 inline-block h-1 w-1 rounded-pill bg-white/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
