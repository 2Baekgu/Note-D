import type { Metadata } from "next";
import Link from "next/link";
import { getAnalytics } from "@/lib/analytics";
import { StatsPanel } from "@/components/studio/StatsPanel";
import { AdminNav } from "@/components/studio/AdminNav";
import { StudioGate } from "@/components/studio/StudioGate";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Stats",
  description: "무엇이 얼마나 읽혔는지.",
  robots: { index: false },
};

/** Figures change by the hour; the fetch itself is cached for five minutes. */
export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const data = await getAnalytics();

  return (
    <PageFrame>
      <header className="shell page-head">
        <Link href="/studio" className="t-label link-underline text-ink-muted">
          ← Studio
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">Admin only</p>
            <h1 className="t-display mt-4">Stats</h1>
          </div>
          <p className="t-body max-w-[32ch] pb-3 text-ink-muted">
            무엇이 읽히고 있는지. 사람이 아니라 글에 대한 기록입니다.
          </p>
        </div>
        <div className="mt-8">
          <AdminNav />
        </div>
      </header>

      <GridRule />

      <div className="shell section-pad">
        <StudioGate next="/studio/admin/stats">
          <StatsPanel data={data} />
        </StudioGate>
      </div>
    </PageFrame>
  );
}
