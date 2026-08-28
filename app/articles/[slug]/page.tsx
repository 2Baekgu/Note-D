import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  getRelatedArticles,
  listComments,
  publishedArticleSlugs,
} from "@/lib/repo";
import { ContentBody } from "@/components/content/ContentBody";
import { AuthorTools } from "@/components/article/AuthorTools";
import { Discussion } from "@/components/article/Discussion";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Avatar } from "@/components/ui/Avatar";
import { ChipLink } from "@/components/ui/Chip";
import { Divider } from "@/components/ui/Divider";
import { readingTime } from "@/lib/content/doc";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";
import { topicSlug, formatDate } from "@/lib/utils";

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
  return {
    title: article.title,
    description: article.subtitle,
    openGraph: { title: article.title, description: article.subtitle, type: "article" },
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
        <header className="article-column">
          {/* Every topic the piece sits under — the lead one first. */}
          <div className="flex flex-wrap items-center gap-2">
            {article.topics.map((t, i) => (
              <ChipLink
                key={t}
                href={`/articles?topic=${topicSlug(t)}`}
                tone={i === 0 ? "solid" : "outline"}
                size="sm"
              >
                {t}
              </ChipLink>
            ))}
          </div>

          <h1 className="t-h1 mt-6 text-balance">{article.title}</h1>

          <p className="t-body-lg mt-6 text-ink-muted">{article.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-line py-4">
            {/* One line: name and role read together, then the rest of the
                byline, rather than the name stacking over its own title. */}
            <Link
              href={`/members/${article.author.handle}`}
              className="group flex items-center gap-3"
            >
              <Avatar name={article.author.name} src={article.author.profileImage} size="md" />
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="t-body font-medium transition-colors duration-[var(--duration-base)] group-hover:text-accent">
                  {article.author.name}
                </span>
                <span className="t-caption text-ink-faint">{article.author.title}</span>
              </span>
            </Link>
            <Divider vertical className="h-6" />
            <span className="t-caption text-ink-muted">{formatDate(article.publishedAt)}</span>
            <Divider vertical className="h-6" />
            <span className="t-caption text-ink-muted">
              읽는 데 약 {readingTime(article.content)}분
            </span>
            {/* An action, so it sits apart from the byline's facts. */}
            <span className="ml-auto">
              <AuthorTools articleId={article.id} authorId={article.authorId} />
            </span>
          </div>
        </header>

        {/* No cover here. It is the card thumbnail and nothing else — drawing
            it above the body put the picture in twice once you could pick one
            from the article, and gave articles with no pictures a generated
            one they never asked for. The body is exactly what was written. */}

        {/* ── Body ─────────────────────────────────────── */}
        <div className="article-shell mt-16">
          <ContentBody content={article.content} seed={article.slug} />
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
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        </>
      )}
    </PageFrame>
  );
}
