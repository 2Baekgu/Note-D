"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** A contribution graph. The study's unit is a week rather than a day — one
 *  post a week is the whole commitment — so a cell is a week, a row is a
 *  year, and a second post in the same week deepens the colour. */

type Cell = {
  key: string;
  monday: Date;
  count: number;
  titles: string[];
  inYear: boolean;
};

const LEVELS = [
  "var(--streak-0)",
  "var(--streak-1)",
  "var(--streak-2)",
  "var(--streak-3)",
  "var(--streak-4)",
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PITCH = 12; // cell + gap
const WEEKS = 53;

const level = (n: number) => (n === 0 ? 0 : Math.min(n, 4));

function mondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

const label = (d: Date) =>
  `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

export function PostingStreak({
  posts,
}: {
  posts: { title: string; publishedAt: string }[];
}) {
  const [hover, setHover] = useState<{ cell: Cell; x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const years = useMemo(() => {
    const byWeek = new Map<string, { count: number; titles: string[] }>();
    for (const p of posts) {
      const d = new Date(`${p.publishedAt}T00:00:00`);
      if (Number.isNaN(d.getTime())) continue;
      const key = iso(mondayOf(d));
      const slot = byWeek.get(key) ?? { count: 0, titles: [] };
      slot.count += 1;
      slot.titles.push(p.title);
      byWeek.set(key, slot);
    }

    const found = posts
      .map((p) => new Date(`${p.publishedAt}T00:00:00`))
      .filter((d) => !Number.isNaN(d.getTime()))
      .map((d) => d.getFullYear());
    const now = new Date().getFullYear();
    const first = found.length ? Math.min(...found) : now;
    const last = Math.max(now, ...(found.length ? found : [now]));

    const rows: { year: number; cells: Cell[] }[] = [];
    for (let y = first; y <= last; y++) {
      const start = mondayOf(new Date(y, 0, 1));
      const cells: Cell[] = [];
      for (let i = 0; i < WEEKS; i++) {
        const monday = new Date(start);
        monday.setDate(monday.getDate() + i * 7);
        const slot = byWeek.get(iso(monday));
        cells.push({
          key: iso(monday),
          monday,
          count: slot?.count ?? 0,
          titles: slot?.titles ?? [],
          inYear: monday.getFullYear() === y || i === 0,
        });
      }
      rows.push({ year: y, cells });
    }
    return rows;
  }, [posts]);

  if (!posts.length) return null;

  // Mouse and keyboard both land here; only the element matters.
  function show(e: { currentTarget: HTMLElement }, cell: Cell) {
    const box = boxRef.current?.getBoundingClientRect();
    const cellBox = e.currentTarget.getBoundingClientRect();
    if (!box) return;
    setHover({
      cell,
      x: cellBox.left - box.left + cellBox.width / 2,
      y: cellBox.top - box.top,
    });
  }

  return (
    <div ref={boxRef} className="surface relative mt-10 p-5">
      <p className="t-caption text-ink-muted">
        {posts.length} posts
      </p>

      <div className="scroll-x mt-4">
        <div style={{ width: WEEKS * PITCH + 30 }}>
          {/* Month ruler */}
          <div className="relative ml-[30px] h-4">
            {MONTHS.map((m, i) => (
              <span
                key={m}
                className="absolute top-0 text-ink-faint"
                style={{ left: Math.round((i * WEEKS) / 12) * PITCH, fontSize: "0.6875rem" }}
              >
                {m}
              </span>
            ))}
          </div>

          {years.map((row) => (
            <div key={row.year} className="flex items-center">
              <span
                className="w-[30px] shrink-0 text-ink-faint"
                style={{ fontSize: "0.625rem" }}
              >
                {String(row.year).slice(2)}
              </span>
              <div className="flex gap-[3px] py-[1.5px]">
                {row.cells.map((cell) => (
                  <button
                    key={cell.key}
                    type="button"
                    onMouseOver={(e) => show(e, cell)}
                    onMouseOut={() => setHover(null)}
                    onFocus={(e) => show(e, cell)}
                    onBlur={() => setHover(null)}
                    aria-label={`${label(cell.monday)} week, ${cell.count} posts`}
                    className={cn(
                      "h-[9px] w-[9px] shrink-0 rounded-[2px]",
                      !cell.inYear && "opacity-30",
                    )}
                    style={{ background: LEVELS[level(cell.count)] }}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-3 flex items-center justify-end gap-1">
            <span className="text-ink-faint" style={{ fontSize: "0.6875rem" }}>
              Less
            </span>
            {LEVELS.map((c) => (
              <span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
            ))}
            <span className="text-ink-faint" style={{ fontSize: "0.6875rem" }}>
              More
            </span>
          </div>
        </div>
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md bg-inverse px-2.5 py-1.5 text-center text-on-inverse shadow-float"
          style={{ left: hover.x, top: hover.y - 6, maxWidth: 260 }}
          role="tooltip"
        >
          <p style={{ fontSize: "0.6875rem", lineHeight: 1.5 }}>
            <strong>
              {hover.cell.count === 0 ? "No posts" : `${hover.cell.count} post${hover.cell.count > 1 ? "s" : ""}`}
            </strong>
            {` · week of ${label(hover.cell.monday)}`}
          </p>
          {hover.cell.titles.length > 0 && (
            <p className="truncate opacity-70" style={{ fontSize: "0.6875rem" }}>
              {hover.cell.titles.join(" · ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
