import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  getRelatedArticles,
  listComments,
  publishedArticleSlugs, toListItem } from "@/lib/repo";
import { ContentBody } from "@/components/content/ContentBody";
import { ImageZoom } from "@/components/content/ImageZoom";
import { AuthorTools } from "@/components/article/AuthorTools";
import { Discussion } from "@/components/article/Discussion";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ArticleCard } from "@/components/article/ArticleCard";
import { ArticleHead } from "@/components/article/ArticleHead";
import { Avatar } from "@/components/ui/Avatar";
import { readingTime } from "@/lib/content/doc";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await publishedArticleSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found" };
  // Without og:image a shared link is a bare title and a domain — which is
  // exactly what a bookmark card of one of our own articles looked like.
  // metadataBase resolves the cover's relative path to an absolute URL.
  const images = article.coverImage ? [article.coverImage] : undefined;

  return {
    title: article.title,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      type: "article",
      url: `/articles/${encodeURIComponent(article.slug)}`,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: article.title,
      description: article.subtitle,
      images,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // The cover follows the same rule as every other figure: real proportion,
  // never upscaled past the source. A height cap made each article's cover a
  // different width, so the opening never lined up with the title.

  const [comments, related] = await Promise.all([
    listComments(article.id),
    getRelatedArticles(article),
  ]);

  return (
    <PageFrame>
      <ReadingProgress />

      <article className="shell section-pad">
        {/* ── Head ─────────────────────────────────────── */}
        <ArticleHead
          topics={article.topics}
          title={article.title}
          subtitle={article.subtitle}
          author={{
            name: article.author.name,
            title: article.author.title,
            profileImage: article.author.profileImage,
            handle: article.author.handle,
          }}
          publishedAt={article.publishedAt}
          readingMinutes={readingTime(article.content)}
          action={<AuthorTools articleId={article.id} authorId={article.authorId} />}
          linked
        />

        {/* No cover here. It is the card thumbnail and nothing else — drawing
            it above the body put the picture in twice once you could pick one
            from the article, and gave articles with no pictures a generated
            one they never asked for. The body is exactly what was written. */}

        {/* ── Body ─────────────────────────────────────── */}
        <div className="article-shell mt-16">
          <ContentBody content={article.content} seed={article.slug} />
          <ImageZoom />
        </div>

        {/* ── References ───────────────────────────────── */}
        <section className="article-column mt-16">
          <h2 className="t-label border-t border-line pt-4 text-accent">References</h2>
          {article.references.length > 0 ? (
            <ol className="mt-6 space-y-3">
              {article.references.map((ref, i) => (
                <li key={i} className="t-body grid grid-cols-[2rem_1fr] gap-2">
                  <span className="t-caption pt-1 text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-muted">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline"
                      >
                        {ref.label}
                      </a>
                    ) : (
                      ref.label
                    )}
                    {ref.source && <span className="text-ink-faint"> — {ref.source}</span>}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="t-body mt-6 text-ink-faint">참고자료가 아직 없습니다.</p>
          )}
        </section>

        {/* ── Author ───────────────────────────────────── */}
        <section className="article-column mt-16">
          <Link
            href={`/members/${article.author.handle}`}
            className="surface group flex flex-col gap-6 p-6 transition-colors duration-[var(--duration-base)] ease-out-quint hover:border-ink sm:flex-row sm:items-center sm:p-8"
          >
            <Avatar name={article.author.name} src={article.author.profileImage} size="xl" />
            <div className="min-w-0 flex-1">
              <p className="t-label text-ink-faint">Written by</p>
              <p className="t-h2 mt-2 transition-colors duration-[var(--duration-base)] group-hover:text-accent">
                {article.author.name}
              </p>
              <p className="t-body mt-3 text-ink-muted">{article.author.bio}</p>
            </div>
            <span className="t-label shrink-0 text-ink-faint transition-colors duration-[var(--duration-base)] group-hover:text-accent">
              Profile →
            </span>
          </Link>
        </section>

        <Discussion articleId={article.id} initialComments={comments} />
      </article>

      {/* ── Related ─────────────────────────────────────── */}
      {related.length > 0 && (
        <>
          <GridRule />

          <section className="shell section-pad" aria-labelledby="related">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="related" className="t-label text-accent">
                Keep reading
              </h2>
              <Link href="/articles" className="t-label link-underline">
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.id} article={toListItem(a)} />
              ))}
            </div>
          </section>
        </>
      )}
    </PageFrame>
  );
}
