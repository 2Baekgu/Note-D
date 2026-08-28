import type { Metadata } from "next";
import { listArticles, listMembers } from "@/lib/repo";
import { StudioDashboard } from "@/components/studio/StudioDashboard";
import { StudioGate } from "@/components/studio/StudioGate";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Studio",
  description: "아티클 작성과 발행 관리.",
  robots: { index: false },
};

export default async function StudioPage() {
  const [articles, members] = await Promise.all([
    listArticles({ includeDrafts: true }),
    listMembers(),
  ]);

  return (
    <PageFrame>
      <header className="shell page-head">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">For members</p>
            <h1 className="t-display mt-4">Studio</h1>
          </div>
          <p className="t-body max-w-[32ch] pb-3 text-ink-muted">
            공부한 것을 글로 옮기는 곳. 초안으로 두었다가 준비되면 발행하세요.
          </p>
        </div>
      </header>

      <GridRule />

      <div className="shell section-pad">
        <StudioGate>
          <StudioDashboard
            serverArticles={articles.map(({ author, ...rest }) => rest)}
            members={members}
          />
        </StudioGate>
      </div>
    </PageFrame>
  );
}
