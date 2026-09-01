import Link from "next/link";
import type { ArticleWithAuthor } from "@/lib/types";
import { CoverMedia } from "@/components/article/CoverArt";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { ArrowGlyph, ButtonLink } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { formatDate } from "@/lib/utils";
import { readingTime } from "@/lib/content/doc";

export function FeaturedArticle({ article }: { article: ArticleWithAuthor }) {
  return (
    <section className="shell pt-8 sm:pt-12" aria-labelledby="featured-title">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
          <div className="flex items-center gap-3">
            <Chip tone="accent" size="sm">
              Featured
            </Chip>
            <span className="t-caption text-ink-faint">{formatDate(article.publishedAt)}</span>
          </div>

          <h1 id="featured-title" className="t-display mt-6 text-balance">
            <Link
              href={`/articles/${article.slug}`}
              className="transition-colors duration-[var(--duration-base)] ease-out-quint hover:text-accent"
            >
              {article.title}
            </Link>
          </h1>

          <p className="t-body-lg mt-6 max-w-[46ch] text-ink-muted">{article.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="flex items-center gap-2">
              <Avatar name={article.author.name} src={article.author.profileImage} size="md" />
              <span className="t-body">{article.author.name}</span>
            </span>
            <Divider vertical className="h-4" />
            <span className="t-label text-ink-muted">{article.topics[0]}</span>
            <Divider vertical className="h-4" />
            <span className="t-caption text-ink-faint">
              {readingTime(article.content)} min read
            </span>
          </div>

          <ButtonLink href={`/articles/${article.slug}`} className="group mt-12">
            Read article
            <ArrowGlyph />
          </ButtonLink>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7">
          <Link href={`/articles/${article.slug}`} className="group block">
            <div className="media aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.2]">
              <CoverMedia
                src={article.coverImage}
                alt=""
                seed={article.slug}
                topic={article.topics[0]}
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
              />
              <div className="media-scrim" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <Chip tone="onMedia" size="sm">
                  {article.topics[0]}
                </Chip>
                <span className="t-label text-white/70">01</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
