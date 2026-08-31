"use client";

import { useState } from "react";
import Link from "next/link";
import type { Analytics, Point, Ranked } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Reading figures.
 *
 *  One hue throughout — the accent — because every chart here answers the
 *  same question, "how much". Nothing is telling series apart, so nothing
 *  needs a second colour, and the text keeps its ink tokens rather than
 *  wearing the data's. */

const fmt = (n: number) => n.toLocaleString("ko-KR");
const dayLabel = (d: string) => `${Number(d.slice(5, 7))}월 ${Number(d.slice(8, 10))}일`;

const DEVICE: Record<string, string> = {
  desktop: "데스크톱",
  mobile: "모바일",
  tablet: "태블릿",
  wearable: "웨어러블",
  console: "콘솔",
  smarttv: "TV",
};

export function StatsPanel({ data }: { data: Analytics }) {
  if (data.missing) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h2">연결이 아직 남았습니다</p>
        <p className="t-body mx-auto mt-4 max-w-[52ch] text-ink-muted">
          {data.missing === "token" ? (
            <>
              Vercel 액세스 토큰을 환경변수 <code>ANALYTICS_API_TOKEN</code> 으로 넣고
              재배포해주세요. 환경변수는 저장만으로는 적용되지 않고, 새 배포부터 반영됩니다.
            </>
          ) : (
            <>
              프로젝트 ID를 찾지 못했습니다. 보통 Vercel이 자동으로 넣어주지만, 필요하면{" "}
              <code>ANALYTICS_PROJECT_ID</code> 로 직접 지정할 수 있습니다.
            </>
          )}
        </p>
      </div>
    );
  }

  const { totals } = data;
  const delta = totals.previous7 ? (totals.last7 - totals.previous7) / totals.previous7 : null;
  const range = `최근 ${data.days}일`;

  return (
    <div className="space-y-16">
      {data.error && (
        <p className="surface-dashed t-caption px-4 py-3 text-ink-muted">
          일부 수치를 가져오지 못했습니다 — {data.error}
        </p>
      )}

      <section aria-label="요약">
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <Tile label="전체 조회" value={totals.views} note="집계 시작부터" />
          <Tile label="순 방문자" value={totals.visitors} note="집계 시작부터" />
          <Tile label="오늘" value={totals.today} note="오늘 하루" />
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

      <Trend days={data.daily} range={range} />

      <Bars
        title="많이 읽힌 글"
        caption={`${range} · 조회수 기준`}
        rows={data.articles}
        empty="아직 읽힌 글이 없습니다."
      />

      <div className="grid gap-16 lg:grid-cols-2">
        <Bars
          title="유입 경로"
          caption="사이트 밖에서 들어온 경우"
          rows={data.referrers}
          empty="외부에서 들어온 기록이 아직 없습니다."
        />
        <Bars
          title="기기"
          caption="무엇으로 읽었는지"
          rows={data.devices.map((d) => ({ ...d, label: DEVICE[d.label.toLowerCase()] ?? d.label }))}
          empty="기록이 없습니다."
        />
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        <Bars title="국가" caption="어디에서 읽었는지" rows={data.countries} empty="기록이 없습니다." />
        <Bars title="브라우저" caption="무엇으로 열었는지" rows={data.browsers} empty="기록이 없습니다." />
      </div>

      <Bars
        title="많이 열린 페이지"
        caption={`${range} · 글이 아닌 화면까지 포함`}
        rows={data.pages}
        empty="기록이 없습니다."
        mono
      />

      <p className="t-caption border-t border-line pt-6 text-ink-faint">
        숫자는 Vercel Web Analytics 가 셉니다. 쿠키를 쓰지 않고 봇은 제외되며, 모바일과
        데스크톱을 같은 방식으로 셉니다. 5분마다 새로 읽어오고, Hobby 요금제는 최근 한 달치를
        보관하므로 기간별 수치는{` ${range}`}까지 보여줍니다.
      </p>
    </div>
  );
}

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
        <p className={cn("t-caption mt-2", tone === "up" ? "text-accent" : "text-ink-faint")}>
          {note}
        </p>
      )}
    </div>
  );
}

/** A single series, so no legend — the heading says what is plotted — and
 *  only the busiest day carries a label. */
function Trend({ days, range }: { days: Point[]; range: string }) {
  const [at, setAt] = useState<number | null>(null);
  if (!days.length) return null;

  const W = 720;
  const H = 210;
  const PAD = { top: 16, right: 16, bottom: 26, left: 44 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const peak = Math.max(1, ...days.map((d) => d.views));
  const step = peak <= 5 ? 1 : peak <= 20 ? 5 : peak <= 100 ? 20 : peak <= 500 ? 100 : 500;
  const top = Math.ceil(peak / step) * step;

  const x = (i: number) =>
    PAD.left + (days.length === 1 ? plotW / 2 : (i / (days.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH;

  const line = days
    .map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.views).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(days.length - 1).toFixed(1)},${(PAD.top + plotH).toFixed(1)} L${x(0).toFixed(1)},${(PAD.top + plotH).toFixed(1)} Z`;

  // Rounded before duplicates are dropped: with a ceiling of 1, a midpoint of
  // 0.5 would print as a second "1".
  const ticks = [...new Set([0, Math.round(top / 2), top])];
  const busiest = days.reduce((best, d, i) => (d.views > days[best].views ? i : best), 0);
  const shown = at ?? busiest;
  const point = days[shown];

  return (
    <section aria-labelledby="trend">
      <h2 id="trend" className="t-h2">
        일별 조회수
      </h2>
      <p className="t-caption mt-2 text-ink-faint">{range}</p>

      <figure className="surface mt-6 overflow-hidden p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full"
          role="img"
          aria-label={`${range} 일별 조회수. 가장 많은 날은 ${dayLabel(days[busiest].day)}, ${fmt(days[busiest].views)}회.`}
          onMouseLeave={() => setAt(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fill="var(--ink-faint)" fontSize="11">
                {fmt(t)}
              </text>
            </g>
          ))}

          <path d={area} fill="var(--accent)" opacity="0.1" />
          <path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* The marker sits on the day being read; the surface ring keeps it
              legible where it crosses the line. */}
          <circle cx={x(shown)} cy={y(point.views)} r="5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />

          {/* Hit targets are the full column, not the 10px dot. */}
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
              {dayLabel(days[i].day)}
            </text>
          ))}
        </svg>

        <figcaption className="t-caption mt-3 text-ink-muted">
          <b className="font-medium text-ink">{dayLabel(point.day)}</b> · 조회 {fmt(point.views)}회 ·
          방문자 {fmt(point.visitors)}명
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
    <section aria-labelledby={`bars-${title}`}>
      <h2 id={`bars-${title}`} className="t-h2">
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
                    <Link
                      href={r.href}
                      className={cn("t-body link-underline truncate", mono && "font-mono text-[0.8125rem]")}
                    >
                      {r.label}
                    </Link>
                  ) : (
                    <span className={cn("t-body truncate", mono && "font-mono text-[0.8125rem]")}>
                      {r.label}
                    </span>
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
