import { Suspense } from "react";
import type { Metadata } from "next";
import { listArticles } from "@/lib/repo";
import { topics } from "@/lib/data/topics";
import { ArticleBrowser } from "@/components/article/ArticleBrowser";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Articles",
  description: "스터디 멤버들이 쓴 UX/UI 아티클 전체 아카이브.",
};

export default async function ArticlesPage() {
  const articles = await listArticles();

  return (
    <PageFrame>
      <header className="shell page-head">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">The Archive</p>
            <h1 className="t-display mt-4">Articles</h1>
          </div>
          <p className="t-body max-w-[34ch] pb-3 text-ink-muted">
            지금까지 발행된 모든 글입니다. 주제나 키워드로 좁혀 보세요.
          </p>
        </div>
      </header>

      <GridRule />

      <div className="shell pt-12">
        <Suspense fallback={<p className="t-caption py-24 text-ink-faint">Loading archive…</p>}>
          <ArticleBrowser articles={articles} topics={topics} />
        </Suspense>
      </div>
    </PageFrame>
  );
}
