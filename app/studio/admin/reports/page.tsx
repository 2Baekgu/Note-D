import type { Metadata } from "next";
import Link from "next/link";
import { listBugReports } from "@/lib/repo";
import { AdminNav } from "@/components/studio/AdminNav";
import { BugReportList } from "@/components/studio/BugReportList";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Bug reports",
  description: "멤버가 보낸 버그와 개선 요청.",
  robots: { index: false },
};

/** Reports arrive and get closed from this screen, so never from cache. */
export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  const reports = await listBugReports();

  return (
    <PageFrame>
      <header className="shell page-head">
        <Link href="/studio" className="t-label link-underline text-ink-muted">
          ← Studio
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">Admin only</p>
            <h1 className="t-display mt-4">Bug reports</h1>
          </div>
          <p className="t-body max-w-[32ch] pb-3 text-ink-muted">
            멤버가 쓰다가 만난 버그와 고쳐졌으면 하는 것들입니다. 처리한 것은
            닫아두면 목록이 짧아집니다.
          </p>
        </div>
        <div className="mt-8">
          <AdminNav />
        </div>
      </header>

      <GridRule />

      <div className="shell section-pad">
        <BugReportList reports={reports} />
      </div>
    </PageFrame>
  );
}
