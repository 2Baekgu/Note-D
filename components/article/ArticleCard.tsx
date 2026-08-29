import Link from "next/link";
import type { ArticleListItem } from "@/lib/types";
import { CoverMedia } from "./CoverArt";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { cn, formatDate } from "@/lib/utils";

export type CardRatio = "portrait" | "tall" | "square" | "wide";

/* Rhythm comes from mixing proportions across the grid. The flattest step
   (16/10) is gone — it produced cards too short to hold a title, which is
   what made one card look abruptly smaller than its neighbours. Nothing here
   is flatter than 1.18, so every card has room for three lines. */
const RATIO: Record<CardRatio, string> = {
  tall: "aspect-[3/4.6]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[4/3.4]",
};

export function ArticleCard({
  article,
  ratio = "portrait",
  aspect,
  className,
}: {
  article: ArticleListItem;
  ratio?: CardRatio;
  /** Exact width/height, used by the balanced grid. Wins over `ratio`. */
  aspect?: number;
  className?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/articles/${article.slug}`} className="block">
        <div
          className={cn("media", !aspect && RATIO[ratio])}
          style={aspect ? { aspectRatio: String(aspect) } : undefined}
        >
          <div className="absolute inset-0">
            <CoverMedia
              src={article.coverImage}
              alt=""
              seed={article.slug}
              topic={article.topics[0]}
            />
          </div>

          <div className="media-scrim" aria-hidden="true" />

          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <span className="t-caption text-white/85">{formatDate(article.publishedAt)}</span>
              {/* Topics overlap, so a card can carry more than one. Two is
                  the most that fits without crowding the date. */}
              <div className="flex flex-wrap justify-end gap-1.5">
                {article.topics.slice(0, 2).map((t) => (
                  <Chip key={t} tone="onMedia" size="sm">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <h3 className="t-h3 line-clamp-3 text-white">{article.title}</h3>

              <div className="mt-4 flex items-center gap-2 text-white/70">
                <Avatar name={article.author.name} src={article.author.profileImage} size="xs" />
                <span className="t-caption">{article.author.name}</span>
                <span className="t-caption text-white/40">·</span>
                {/* Labelled so it cannot be misread as "5 minutes ago". */}
                <span className="t-caption">읽기 {article.readingMinutes}분</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Compact row for list view, member pages and the studio.
 *  Not a card — no media, no scrim, just hairline-separated rows. */
export function ArticleRow({
  article,
  index,
}: {
  article: ArticleListItem;
  index: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid grid-cols-[2.5rem_1fr] items-start gap-4 border-b border-line py-6 transition-colors duration-[var(--duration-base)] ease-out-quint hover:bg-[rgba(22,21,15,0.03)] sm:grid-cols-[3rem_minmax(0,1fr)_9rem_7rem] sm:items-center sm:gap-6 sm:px-2"
    >
      <span className="t-caption pt-1 text-ink-faint sm:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="t-h3 line-clamp-2">
          <span className="link-underline-group">{article.title}</span>
        </h3>
        <p className="t-caption mt-2 line-clamp-1 text-ink-muted">{article.subtitle}</p>
        <div className="mt-3 flex items-center gap-3 sm:hidden">
          <span className="t-label text-ink-faint">{article.topics.join(" · ")}</span>
          <span className="t-caption text-ink-faint">{formatDate(article.publishedAt)}</span>
        </div>
      </div>

      <span className="t-label hidden text-ink-muted sm:block">
        {article.topics.join(" · ")}
      </span>
      <span className="t-caption hidden text-right text-ink-faint sm:block">
        {formatDate(article.publishedAt)}
      </span>
    </Link>
  );
}
