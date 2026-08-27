"use client";

import { useEffect, useState } from "react";
import type { Article } from "@/lib/types";
import { ArticleEditor } from "./ArticleEditor";
import { getLocalArticle } from "@/lib/studio";

/** Server-known article, or one that only exists in this browser. */
export function EditorLoader({
  id,
  serverArticle,
}: {
  id: string;
  serverArticle?: Article;
}) {
  const [article, setArticle] = useState<Article | undefined>(serverArticle);
  const [checked, setChecked] = useState(Boolean(serverArticle));

  useEffect(() => {
    if (serverArticle) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- local drafts are only readable after hydration
    setArticle(getLocalArticle(id) ?? undefined);
    setChecked(true);
  }, [id, serverArticle]);

  if (!checked) return <p className="t-caption py-24 text-ink-faint">Loading…</p>;

  if (!article) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">글을 찾을 수 없습니다</p>
        <p className="t-body mt-3 text-ink-muted">
          삭제되었거나 다른 브라우저에 저장된 초안일 수 있습니다.
        </p>
      </div>
    );
  }

  return <ArticleEditor initial={article} />;
}
