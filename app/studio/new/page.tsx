import type { Metadata } from "next";
import { PageFrame } from "@/components/site/PageFrame";
import { ArticleEditor } from "@/components/studio/ArticleEditor";
import { StudioGate } from "@/components/studio/StudioGate";

export const metadata: Metadata = {
  title: "New article",
  robots: { index: false },
};

export default function NewArticlePage() {
  return (
    <PageFrame>
      <div className="shell section-pad">
        <StudioGate next="/studio/new">
          <ArticleEditor />
        </StudioGate>
      </div>
    </PageFrame>
  );
}
