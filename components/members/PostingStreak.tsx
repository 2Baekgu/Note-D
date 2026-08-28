"use client";

import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** A contribution graph on the study's own unit. GitHub counts a day and
 *  takes its height from the seven weekdays; a week has no such axis, so a
 *  year in weeks is one long line. Each year folds at the quarter — thirteen
 *  weeks a row, four rows — and two years sit side by side, which fills the
 *  column across twenty-six columns while keeping the cells the size of a
 *  contribution square rather than a tile. ‹ › slides the pair when there
 *  are more years than fit. */

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
const PER_ROW = 13; // a quarter
const ROWS = 4;
const START_YEAR = 2025; // the study's first year — every profile opens on it
const ROW_LABEL = ["Jan", "Apr", "Jul", "Oct"];
const SIDE_BY_SIDE = 2; // years shown at once

const level = (n: number) => (n === 0 ? 0 : Math.min(n, 4));

function mondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const label = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

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
    // Somebody who joined this month has one year of their own, and a lone
    // year draws a card half the width of everyone else's. Start every
    // profile at the study's first year; the empty ones are simply grey.
    const now = new Date().getFullYear();
    const first = Math.min(START_YEAR, ...found);
    const last = Math.max(now, START_YEAR, ...found);

    const out: { year: number; rows: Cell[][]; posts: number }[] = [];
    for (let y = first; y <= last; y++) {
      const start = mondayOf(new Date(y, 0, 1));
      const cells: Cell[] = [];
      let count = 0;
      for (let i = 0; i < PER_ROW * ROWS; i++) {
        const monday = new Date(start);
        monday.setDate(monday.getDate() + i * 7);
        const slot = byWeek.get(iso(monday));
        count += slot?.count ?? 0;
        cells.push({
          key: iso(monday),
          monday,
          count: slot?.count ?? 0,
          titles: slot?.titles ?? [],
          inYear: monday.getFullYear() === y || i === 0,
        });
      }
      const rows: Cell[][] = [];
      for (let r = 0; r < ROWS; r++) rows.push(cells.slice(r * PER_ROW, (r + 1) * PER_ROW));
      out.push({ year: y, rows, posts: count });
    }
    return out;
  }, [posts]);

  // Opens on the most recent years, the way a profile should.
  const [index, setIndex] = useState(() => Math.max(0, years.length - SIDE_BY_SIDE));

  const start = Math.min(index, Math.max(0, years.length - SIDE_BY_SIDE));
  const shown = years.slice(start, start + SIDE_BY_SIDE);
  const span =
    shown.length > 1 ? `${shown[0].year}–${shown[shown.length - 1].year}` : `${shown[0].year}`;
  const total = shown.reduce((n, y) => n + y.posts, 0);

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

  const step = (by: -1 | 1) =>
    setIndex((i) => Math.min(Math.max(0, years.length - SIDE_BY_SIDE), Math.max(0, i + by)));

  const arrow =
    "flex h-5 w-5 items-center justify-center rounded-sm text-ink-faint transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.06)] hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <div ref={boxRef} className="surface relative mt-10 px-6 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-label text-ink-faint">Posting streak</p>
        <p className="t-caption text-ink-muted">
          {total} posts in {span}
        </p>
      </div>

      {/* Year picker and key share a line, so the card stays short. */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={arrow}
            onClick={() => step(-1)}
            disabled={index <= 0}
            aria-label="이전 해"
          >
            ‹
          </button>
          <span className="t-caption w-20 text-center tabular-nums">{span}</span>
          <button
            type="button"
            className={arrow}
            onClick={() => step(1)}
            disabled={start >= years.length - SIDE_BY_SIDE}
            aria-label="다음 해"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-ink-faint" style={{ fontSize: "0.625rem" }}>
            Less
          </span>
          {LEVELS.map((c) => (
            <span key={c} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: c }} />
          ))}
          <span className="text-ink-faint" style={{ fontSize: "0.625rem" }}>
            More
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <div className="flex shrink-0 flex-col justify-between self-stretch">
          {ROW_LABEL.map((m) => (
            <div key={m} className="text-right text-ink-faint" style={{ fontSize: "0.625rem" }}>
              {m}
            </div>
          ))}
        </div>

        {shown.map((year) => (
          <div key={year.year} className="min-w-0 flex-1">
            <div className="space-y-[6px]">
              {year.rows.map((row, r) => (
                <div key={r} className="flex gap-[6px]">
                  {row.map((cell) => (
                    <button
                      key={cell.key}
                      type="button"
                      onMouseOver={(e) => show(e, cell)}
                      onMouseOut={() => setHover(null)}
                      onFocus={(e) => show(e, cell)}
                      onBlur={() => setHover(null)}
                      aria-label={`${label(cell.monday)} week, ${cell.count} posts`}
                      className={cn(
                        "aspect-square min-w-0 flex-1 rounded-[3px] transition-transform duration-[var(--duration-fast)]",
                        !cell.inYear && "opacity-30",
                        hover?.cell.key === cell.key && "scale-125",
                      )}
                      style={{ background: LEVELS[level(cell.count)] }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-md bg-inverse px-2.5 py-1.5 text-center text-on-inverse shadow-float"
          style={{ left: hover.x, top: hover.y - 6, maxWidth: 260 }}
          role="tooltip"
        >
          <p style={{ fontSize: "0.6875rem", lineHeight: 1.5 }}>
            <strong>
              {hover.cell.count === 0
                ? "No posts"
                : `${hover.cell.count} post${hover.cell.count > 1 ? "s" : ""}`}
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
