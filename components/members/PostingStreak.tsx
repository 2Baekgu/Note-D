"use client";

import { useMemo, useState } from "react";
import { cn, formatDate } from "@/lib/utils";

/** A contribution graph, but the study's unit is a week rather than a day —
 *  one post a week is the whole commitment, so one post fills a cell and
 *  more than one deepens it. Rows are years, columns the weeks in them. */

type Cell = {
  key: string;
  monday: Date;
  count: number;
  titles: string[];
  inYear: boolean;
};

const LEVELS = ["var(--streak-0)", "var(--streak-1)", "var(--streak-2)", "var(--streak-3)", "var(--streak-4)"];
const level = (n: number) => (n === 0 ? 0 : Math.min(n, 4));

function mondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export function PostingStreak({
  posts,
}: {
  posts: { title: string; publishedAt: string }[];
}) {
  const [hover, setHover] = useState<Cell | null>(null);

  const { years, weeks, total, best, current } = useMemo(() => {
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

    const dates = posts
      .map((p) => new Date(`${p.publishedAt}T00:00:00`))
      .filter((d) => !Number.isNaN(d.getTime()));
    const now = new Date();
    const firstYear = dates.length
      ? Math.min(...dates.map((d) => d.getFullYear()))
      : now.getFullYear();
    const lastYear = Math.max(
      now.getFullYear(),
      ...(dates.length ? dates.map((d) => d.getFullYear()) : [now.getFullYear()]),
    );

    const rows: { year: number; cells: Cell[] }[] = [];
    for (let y = firstYear; y <= lastYear; y++) {
      const start = mondayOf(new Date(y, 0, 1));
      const cells: Cell[] = [];
      for (let i = 0; i < 53; i++) {
        const monday = new Date(start);
        monday.setDate(monday.getDate() + i * 7);
        const key = iso(monday);
        const slot = byWeek.get(key);
        cells.push({
          key,
          monday,
          count: slot?.count ?? 0,
          titles: slot?.titles ?? [],
          // The last row of a year can spill into the next one.
          inYear: monday.getFullYear() === y || i === 0,
        });
      }
      rows.push({ year: y, cells });
    }

    // Longest and current run of consecutive weeks with at least one post.
    const allKeys = rows.flatMap((r) => r.cells.map((c) => c.key));
    let run = 0;
    let longest = 0;
    let tail = 0;
    const thisWeek = iso(mondayOf(now));
    for (const key of allKeys) {
      if (byWeek.has(key)) {
        run += 1;
        longest = Math.max(longest, run);
      } else {
        run = 0;
      }
      if (key === thisWeek) tail = run;
    }

    return {
      years: rows,
      weeks: byWeek.size,
      total: posts.length,
      best: longest,
      current: tail,
    };
  }, [posts]);

  if (!posts.length) return null;

  const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="t-label text-ink-faint">Posting streak</p>
        <p className="t-caption text-ink-muted">
          {weeks}주 동안 {total}편 · 최장 {best}주 연속
          {current > 1 && ` · 지금 ${current}주째`}
        </p>
      </div>

      <div className="scroll-x relative mt-4 pb-1">
        {/* Month ruler. Weeks are 12px apart, so a month is about 4.33 of them. */}
        <div className="relative ml-10 h-4" aria-hidden="true">
          {MONTHS.map((m, i) => (
            <span
              key={m}
              className="t-caption absolute top-0 text-ink-faint"
              style={{ left: `${Math.round((i * 53) / 12) * 12}px`, fontSize: "0.6875rem" }}
            >
              {m}
            </span>
          ))}
        </div>

        {years.map((row) => (
          <div key={row.year} className="mt-1 flex items-center">
            <span className="t-caption w-10 shrink-0 text-ink-faint" style={{ fontSize: "0.6875rem" }}>
              {row.year}
            </span>
            <div className="flex gap-[3px]">
              {row.cells.map((cell) => (
                <button
                  key={cell.key}
                  type="button"
                  onMouseEnter={() => setHover(cell)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(cell)}
                  onBlur={() => setHover(null)}
                  aria-label={`${formatDate(cell.key)} 주 ${cell.count}편`}
                  className={cn(
                    "h-[9px] w-[9px] shrink-0 rounded-[2px] transition-transform duration-[var(--duration-fast)]",
                    !cell.inYear && "opacity-30",
                    hover?.key === cell.key && "scale-125",
                  )}
                  style={{ background: LEVELS[level(cell.count)] }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-3 flex items-center gap-1.5 pl-10">
          <span className="t-caption text-ink-faint" style={{ fontSize: "0.6875rem" }}>
            적음
          </span>
          {LEVELS.map((c) => (
            <span key={c} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
          ))}
          <span className="t-caption text-ink-faint" style={{ fontSize: "0.6875rem" }}>
            많음
          </span>
        </div>
      </div>

      {/* Kept below the grid rather than floating, so it never covers a cell. */}
      <p className="t-caption mt-3 min-h-[1.5em] text-ink-muted">
        {hover ? (
          hover.count === 0 ? (
            <span className="text-ink-faint">{formatDate(hover.key)} 주 · 쉬어감</span>
          ) : (
            <>
              <span className="font-medium text-ink">{formatDate(hover.key)} 주 · {hover.count}편</span>
              <span className="text-ink-faint"> — {hover.titles.join(", ")}</span>
            </>
          )
        ) : (
          <span className="text-ink-faint">칸에 마우스를 올리면 그 주에 쓴 글이 보입니다.</span>
        )}
      </p>
    </div>
  );
}
