import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMemberByHandle, listArticles, memberHandles } from "@/lib/repo";
import { ArticleMasonry } from "@/components/article/ArticleMasonry";
import { ChipLink } from "@/components/ui/Chip";
import { ProfileIdentity } from "@/components/members/ProfileIdentity";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";
import { topicSlug, formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const handles = await memberHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const member = await getMemberByHandle(handle);
  if (!member) return { title: "Not found" };
  return { title: member.name, description: member.bio };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const member = await getMemberByHandle(handle);
  if (!member) notFound();

  const articles = await listArticles({ authorId: member.id });
  const topics = [...new Set(articles.flatMap((a) => a.topics))];

  return (
    <PageFrame>
      <div className="shell section-pad">
        <Link href="/members" className="t-label link-underline text-ink-muted">
          ← Members
        </Link>
      </div>

      <GridRule />

      <header className="shell section-pad">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <ProfileIdentity member={member} />

            {member.links && member.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {member.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer noopener" className="chip chip-outline">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-md border border-line bg-line">
            <div className="bg-paper p-6">
              <dt className="t-label text-ink-faint">Articles</dt>
              <dd className="t-h1 mt-2 tabular-nums">
                {String(articles.length).padStart(2, "0")}
              </dd>
            </div>
            <div className="bg-paper p-6">
              <dt className="t-label text-ink-faint">Topics</dt>
              <dd className="t-h1 mt-2 tabular-nums">{String(topics.length).padStart(2, "0")}</dd>
            </div>
            <div className="col-span-2 bg-paper p-6">
              <dt className="t-label text-ink-faint">Joined</dt>
              <dd className="t-caption mt-2 text-ink-muted">{formatDate(member.joinedAt)}</dd>
            </div>
            {topics.length > 0 && (
              <div className="col-span-2 bg-paper p-6">
                <dt className="t-label text-ink-faint">Writes about</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <ChipLink key={t} href={`/articles?topic=${topicSlug(t)}`} tone="ghost" size="sm">
                      {t}
                    </ChipLink>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <GridRule />

      <section className="shell section-pad" aria-labelledby="member-articles">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="member-articles" className="t-label text-accent">
            Articles
          </h2>
          <span className="t-caption text-ink-faint">
            {String(articles.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-8">
          {articles.length > 0 ? (
            <ArticleMasonry articles={articles} />
          ) : (
            <p className="surface-dashed t-body px-6 py-24 text-center text-ink-muted">
              아직 발행한 글이 없습니다.
            </p>
          )}
        </div>
      </section>
    </PageFrame>
  );
}
