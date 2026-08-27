import type { Metadata } from "next";
import { listArticles } from "@/lib/repo";
import { PageFrame } from "@/components/site/PageFrame";
import { EditorLoader } from "@/components/studio/EditorLoader";
import { StudioGate } from "@/components/studio/StudioGate";

export const metadata: Metadata = {
  title: "Edit article",
  robots: { index: false },
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articles = await listArticles({ includeDrafts: true });
  const found = articles.find((a) => a.id === id);
  const serverArticle = found
    ? (({ author: author, ...rest }) => rest)(found)
    : undefined;

  return (
    <PageFrame>
      <div className="shell section-pad">
        <StudioGate next={`/studio/${id}`}>
          <EditorLoader id={id} serverArticle={serverArticle} />
        </StudioGate>
      </div>
    </PageFrame>
  );
}
