import type { Metadata } from "next";
import Link from "next/link";
import { listArticles, listMembers } from "@/lib/repo";
import { AdminPanel } from "@/components/studio/AdminPanel";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Admin",
  description: "멤버 승인과 전체 아티클 관리.",
  robots: { index: false },
};

/** Roles change from this screen, so it must never be served from cache. */
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [members, articles] = await Promise.all([
    listMembers(),
    listArticles({ includeDrafts: true }),
  ]);

  return (
    <PageFrame>
      <header className="shell page-head">
        <Link href="/studio" className="t-label link-underline text-ink-muted">
          ← Studio
        </Link>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">Admin only</p>
            <h1 className="t-display mt-4">Members</h1>
          </div>
          <p className="t-body max-w-[32ch] pb-3 text-ink-muted">
            가입은 누구에게나 열려 있습니다. 글을 발행할 사람만 여기서 멤버로 올려주세요.
          </p>
        </div>
      </header>

      <GridRule />

      <div className="shell section-pad">
        <AdminPanel
          members={members}
          articles={articles.map(({ author, ...rest }) => rest)}
        />
      </div>
    </PageFrame>
  );
}
