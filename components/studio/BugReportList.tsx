"use client";

import { useEffect, useState } from "react";
import type { BugReport } from "@/lib/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentBody } from "@/components/content/ContentBody";
import { Chip } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";
import { deleteBugReport, loadLocalReports, setReportStatus } from "@/lib/bugs";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "open", label: "열린 것" },
  { id: "resolved", label: "처리함" },
  { id: "all", label: "전체" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

function when(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")}`;
}

export function BugReportList({ reports }: { reports: BugReport[] }) {
  const { loading, isAdmin, mode } = useAuth();
  const [rows, setRows] = useState<BugReport[]>(reports);
  const [filter, setFilter] = useState<Filter>("open");
  const [pending, setPending] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Demo reports live in this browser, so they are only readable after mount.
  useEffect(() => {
    if (mode !== "demo") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is client-only
    setRows(loadLocalReports());
  }, [mode]);

  if (loading) {
    return <p className="t-caption py-24 text-center text-ink-faint">Loading…</p>;
  }

  if (!isAdmin) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">운영자 전용 화면입니다</p>
        <p className="t-body mt-4 text-ink-muted">
          이 화면은 role이 admin인 계정에만 열립니다.
        </p>
        <ButtonLink href="/studio" variant="secondary" className="mt-8">
          ← Studio
        </ButtonLink>
      </div>
    );
  }

  const shown = rows.filter((r) => filter === "all" || r.status === filter);
  const openCount = rows.filter((r) => r.status === "open").length;

  async function mark(id: string, status: BugReport["status"]) {
    setPending(id);
    setError("");
    const res = await setReportStatus(id, status);
    if (res.ok) setRows((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
    else setError(res.error ?? "바꾸지 못했습니다.");
    setPending(null);
  }

  async function remove(id: string) {
    setPending(id);
    setError("");
    const res = await deleteBugReport(id);
    if (res.ok) setRows((list) => list.filter((r) => r.id !== id));
    else setError(res.error ?? "삭제하지 못했습니다.");
    setPending(null);
    setConfirming(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn("chip chip-sm", filter === f.id ? "chip-solid" : "chip-outline")}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="t-caption text-ink-muted">
          열린 리포트 {openCount}개 · 전체 {rows.length}개
        </p>
      </div>

      {error && <p className="t-caption mt-4 text-accent">{error}</p>}

      {shown.length === 0 ? (
        <div className="surface-dashed mt-6 px-6 py-24 text-center">
          <p className="t-body text-ink-muted">
            {filter === "open" ? "열려 있는 리포트가 없습니다." : "리포트가 없습니다."}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {shown.map((r) => (
            <li key={r.id} className="surface p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="t-body font-medium">{r.reporterName}</span>
                {r.reporterEmail && (
                  <span className="t-caption text-ink-faint">{r.reporterEmail}</span>
                )}
                <span className="t-caption text-ink-muted">{when(r.createdAt)}</span>
                <Chip tone={r.status === "open" ? "accent" : "outline"} size="sm">
                  {r.status === "open" ? "OPEN" : "DONE"}
                </Chip>
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <ContentBody content={r.content} seed={r.id} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4">
                <button
                  type="button"
                  disabled={pending === r.id}
                  onClick={() => mark(r.id, r.status === "open" ? "resolved" : "open")}
                  className="t-label link-underline text-ink-muted disabled:opacity-40"
                >
                  {r.status === "open" ? "처리함으로" : "다시 열기"}
                </button>

                {confirming === r.id ? (
                  <span className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="t-label text-accent underline underline-offset-4"
                    >
                      정말 삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(null)}
                      className="t-label text-ink-faint underline underline-offset-4"
                    >
                      취소
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirming(r.id)}
                    className="t-label text-ink-faint underline underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-accent"
                  >
                    삭제
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
