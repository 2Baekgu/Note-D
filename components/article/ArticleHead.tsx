import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Chip, ChipLink } from "@/components/ui/Chip";
import { Divider } from "@/components/ui/Divider";
import { formatDate, topicSlug } from "@/lib/utils";

/** Everything above an article's body: topics, title, subtitle, byline.
 *
 *  Shared by the published page and the editor's preview. They drifted apart
 *  once — the preview grew a cover the article page had dropped, a byline
 *  missing half its parts, and its own spacing — and the only way that does
 *  not happen again is for both to render this. */
export function ArticleHead({
  topics,
  title,
  subtitle,
  author,
  publishedAt,
  readingMinutes,
  action,
  linked = false,
}: {
  topics: string[];
  title: string;
  subtitle: string;
  author: { name: string; title?: string; profileImage?: string | null; handle?: string };
  publishedAt: string;
  readingMinutes: number;
  /** Sits at the right of the byline — the author's edit link, in practice. */
  action?: React.ReactNode;
  /** The published page links topics and the author; the preview does not. */
  linked?: boolean;
}) {
  const byline = (
    <>
      <Avatar name={author.name} src={author.profileImage ?? null} size="md" />
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span
          className={
            linked
              ? "t-body font-medium transition-colors duration-[var(--duration-base)] group-hover:text-accent"
              : "t-body font-medium"
          }
        >
          {author.name}
        </span>
        {author.title && <span className="t-caption text-ink-faint">{author.title}</span>}
      </span>
    </>
  );

  return (
    <header className="article-column">
      {/* Every topic the piece sits under — the lead one first. */}
      <div className="flex flex-wrap items-center gap-2">
        {topics.map((t, i) =>
          linked ? (
            <ChipLink
              key={t}
              href={`/articles?topic=${topicSlug(t)}`}
              tone={i === 0 ? "solid" : "outline"}
              size="sm"
            >
              {t}
            </ChipLink>
          ) : (
            <Chip key={t} tone={i === 0 ? "solid" : "outline"} size="sm">
              {t}
            </Chip>
          ),
        )}
      </div>

      <h1 className="t-h1 mt-6 text-balance">{title}</h1>

      {subtitle && <p className="t-body-lg mt-6 text-ink-muted">{subtitle}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-line py-4">
        {/* One line: name and role read together, then the rest of the byline,
            rather than the name stacking over its own title. */}
        {linked && author.handle ? (
          <Link href={`/members/${author.handle}`} className="group flex items-center gap-3">
            {byline}
          </Link>
        ) : (
          <span className="flex items-center gap-3">{byline}</span>
        )}
        <Divider vertical className="h-6" />
        <span className="t-caption text-ink-muted">{formatDate(publishedAt)}</span>
        <Divider vertical className="h-6" />
        <span className="t-caption text-ink-muted">읽는 데 약 {readingMinutes}분</span>
        {/* An action, so it sits apart from the byline's facts. */}
        {action && <span className="ml-auto">{action}</span>}
      </div>
    </header>
  );
}
