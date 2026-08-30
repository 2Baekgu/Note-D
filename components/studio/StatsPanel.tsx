"use client";

import { useState } from "react";
import Link from "next/link";
import type { DayCount, Ranked, Stats } from "@/lib/stats";
import { cn } from "@/lib/utils";

/** Reading figures.
 *
 *  One hue throughout — the accent — because every chart here answers the
 *  same question, "how much". Nothing is telling series apart, so nothing
 *  needs a second colour, and text keeps the ink tokens rather than wearing
 *  the data's. */

const fmt = (n: number) => n.toLocaleString("ko-KR");

export function StatsPanel({ stats }: { stats: Stats }) {
  if (!stats.ready) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h2">아직 집계가 시작되지 않았습니다</p>
        <p className="t-body mx-auto mt-4 max-w-[46ch] text-ink-muted">
          <code>supabase/migrations/page-views.sql</code> 을 실행하면 이 화면이 채워집니다.
          기록은 그 시점부터 쌓이며, 지난 방문은 되살릴 수 없습니다.
        </p>
      </div>
    );
  }

  const { totals } = stats;
  const delta = totals.previous7 ? (totals.last7 - totals.previous7) / totals.previous7 : null;
  const guestViews = totals.views - totals.memberViews;

  return (
    <div className="space-y-16">
      <section aria-label="요약">
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <Tile label="전체 조회" value={totals.views} note={sinceNote(stats.since)} />
          <Tile label="순 방문자" value={totals.visitors} note="브라우저 기준" />
          <Tile label="오늘" value={totals.today} note="서울 기준 오늘" />
          <Tile
            label="지난 7일"
            value={totals.last7}
            note={
              delta === null
                ? "직전 7일 기록 없음"
                : `직전 7일 대비 ${delta >= 0 ? "+" : ""}${Math.round(delta * 100)}%`
            }
            tone={delta === null ? "flat" : delta >= 0 ? "up" : "down"}
          />
        </div>
      </section>

      <Trend days={stats.daily} grain={stats.grain} since={stats.since} />

      <Bars
        title="많이 읽힌 글"
        caption={`전체 기간 · 조회수 기준 상위 ${stats.articles.length}편`}
        rows={stats.articles}
        empty="아직 읽힌 글이 없습니다."
      />

      <Bars
        title="유입 경로"
        caption="사이트 밖에서 들어온 경우만 · 도메인만 기록합니다"
        rows={stats.referrers}
        empty="외부에서 들어온 기록이 아직 없습니다."
      />

      <section aria-labelledby="who">
        <h2 id="who" className="t-h2">
          누가 읽었나
        </h2>
        <p className="t-caption mt-2 text-ink-faint">
          로그인한 상태로 열린 조회와 그렇지 않은 조회
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          <Tile label="멤버" value={totals.memberViews} note={share(totals.memberViews, totals.views)} />
          <Tile label="비로그인" value={guestViews} note={share(guestViews, totals.views)} />
        </div>
      </section>

      <Bars
        title="많이 열린 페이지"
        caption="글이 아닌 화면까지 포함한 전체 기간"
        rows={stats.pages}
        empty="기록이 없습니다."
        mono
      />
    </div>
  );
}

/** "집계 시작일부터" reads better than a number of days nobody counted. */
const sinceNote = (since: string | null) =>
  since ? `${label(since)}부터 지금까지` : "집계 시작 전";

const label = (d: string) => `${Number(d.slice(5, 7))}월 ${Number(d.slice(8, 10))}일`;

const share = (part: number, whole: number) =>
  whole ? `전체의 ${Math.round((part / whole) * 100)}%` : "—";

function Tile({
  label,
  value,
  note,
  tone = "flat",
}: {
  label: string;
  value: number;
  note?: string;
  tone?: "up" | "down" | "flat";
}) {
  return (
    <div className="bg-paper p-6">
      <p className="t-label text-ink-faint">{label}</p>
      <p className="t-display mt-3 tabular-nums">{fmt(value)}</p>
      {note && (
        <p
          className={cn(
            "t-caption mt-2",
            tone === "up" && "text-accent",
            tone !== "up" && "text-ink-faint",
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}

/** Every day since counting began, or every week once that is too many days
 *  to draw. A single series, so no legend — the heading says what is plotted
 *  — and only the busiest point carries a label. */
function Trend({
  days,
  grain,
  since,
}: {
  days: DayCount[];
  grain: "day" | "week";
  since: string | null;
}) {
  const [at, setAt] = useState<number | null>(null);
  const unit = grain === "week" ? "주" : "일";

  const W = 720;
  const H = 210;
  const PAD = { top: 16, right: 16, bottom: 26, left: 40 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const peak = Math.max(1, ...days.map((d) => d.views));
  // Round the ceiling to something a person would say out loud.
  const step = peak <= 5 ? 1 : peak <= 20 ? 5 : peak <= 100 ? 20 : peak <= 500 ? 100 : 500;
  const top = Math.ceil(peak / step) * step;

  const x = (i: number) => PAD.left + (days.length === 1 ? plotW / 2 : (i / (days.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH;

  const line = days.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.views).toFixed(1)}`).join(" ");
  const area = `${line} L${x(days.length - 1).toFixed(1)},${(PAD.top + plotH).toFixed(1)} L${x(0).toFixed(1)},${(PAD.top + plotH).toFixed(1)} Z`;

  const ticks = [0, top / 2, top];
  const busiest = days.reduce((best, d, i) => (d.views > days[best].views ? i : best), 0);
  const shown = at ?? busiest;

  return (
    <section aria-labelledby="trend">
      <h2 id="trend" className="t-h2">
        {grain === "week" ? "주별" : "일별"} 조회수
      </h2>
      <p className="t-caption mt-2 text-ink-faint">
        {sinceNote(since)} · 서울 기준
      </p>

      <figure className="surface mt-6 overflow-hidden p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`${sinceNote(since)}의 ${unit}별 조회수. 가장 많은 ${unit}은 ${label(days[busiest].day)}, ${fmt(days[busiest].views)}회.`}
          onMouseLeave={() => setAt(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 8}
                y={y(t) + 4}
                textAnchor="end"
                className="tabular-nums"
                fill="var(--ink-faint)"
                fontSize="11"
              >
                {fmt(Math.round(t))}
              </text>
            </g>
          ))}

          <path d={area} fill="var(--accent)" opacity="0.1" />
          <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* The marker sits on the day being read; its surface ring keeps it
              legible where it crosses the line. */}
          <circle cx={x(shown)} cy={y(days[shown].views)} r="5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />

          {/* Hit targets are the full column height, not the 8px dot. */}
          {days.map((d, i) => (
            <rect
              key={d.day}
              x={x(i) - plotW / days.length / 2}
              y={PAD.top}
              width={plotW / days.length}
              height={plotH}
              fill="transparent"
              onMouseEnter={() => setAt(i)}
            />
          ))}

          {[0, Math.floor(days.length / 2), days.length - 1].map((i) => (
            <text
              key={i}
              x={x(i)}
              y={H - 6}
              textAnchor={i === 0 ? "start" : i === days.length - 1 ? "end" : "middle"}
              fill="var(--ink-faint)"
              fontSize="11"
            >
              {label(days[i].day)}
            </text>
          ))}
        </svg>

        <figcaption className="t-caption mt-3 text-ink-muted">
          <b className="font-medium text-ink">
            {label(days[shown].day)}
            {grain === "week" && " 주"}
          </b>{" "}
          · 조회 {fmt(days[shown].views)}회 · 방문자 {fmt(days[shown].visitors)}명
        </figcaption>
      </figure>
    </section>
  );
}

/** A ranked list drawn as bars. The bar is the comparison; the number beside
 *  it is the value, so no axis is needed. */
function Bars({
  title,
  caption,
  rows,
  empty,
  mono = false,
}: {
  title: string;
  caption: string;
  rows: Ranked[];
  empty: string;
  mono?: boolean;
}) {
  const top = Math.max(1, ...rows.map((r) => r.views));

  return (
    <section aria-labelledby={title}>
      <h2 id={title} className="t-h2">
        {title}
      </h2>
      <p className="t-caption mt-2 text-ink-faint">{caption}</p>

      {rows.length === 0 ? (
        <p className="surface-dashed t-body mt-6 px-6 py-12 text-center text-ink-muted">{empty}</p>
      ) : (
        <ol className="mt-6 space-y-3">
          {rows.map((r, i) => (
            <li key={r.label} className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3">
              <span className="t-caption tabular-nums text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline justify-between gap-3">
                  {r.href ? (
                    <Link href={r.href} className={cn("t-body link-underline truncate", mono && "font-mono text-[0.8125rem]")}>
                      {r.label}
                    </Link>
                  ) : (
                    <span className={cn("t-body truncate", mono && "font-mono text-[0.8125rem]")}>{r.label}</span>
                  )}
                  <span className="t-caption shrink-0 tabular-nums text-ink-faint">
                    방문자 {fmt(r.visitors)}
                  </span>
                </span>
                <span className="mt-1.5 block h-2 rounded-r-[4px] bg-[rgba(22,21,15,0.06)]">
                  <span
                    className="block h-full rounded-r-[4px] bg-accent"
                    style={{ width: `${Math.max(2, (r.views / top) * 100)}%` }}
                  />
                </span>
              </span>
              <span className="t-body shrink-0 tabular-nums">{fmt(r.views)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
