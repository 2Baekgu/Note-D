import Link from "next/link";
import { parseContent, youtubeId, type Block } from "@/lib/content/parse";
import { CoverArt } from "@/components/article/CoverArt";
import { imageSizes } from "@/lib/data/image-sizes";
import { cn } from "@/lib/utils";

/* Inline formatting: **bold**  *italic*  `code`  [text](url)  ==marked== */
function inline(text: string, keyPrefix = "i"): React.ReactNode[] {
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\([^)\s]+\))/g;
  const parts = text.split(pattern).filter((p) => p !== undefined && p !== "");

  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={key}>{part.slice(1, -1)}</em>;
    if (/^`[^`]+`$/.test(part)) return <code key={key}>{part.slice(1, -1)}</code>;
    if (/^==[^=]+==$/.test(part))
      return (
        <mark key={key} className="bg-accent-soft px-1 text-ink">
          {part.slice(2, -2)}
        </mark>
      );
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return external ? (
        <a key={key} href={link[2]} target="_blank" rel="noreferrer noopener">
          {link[1]}
        </a>
      ) : (
        <Link key={key} href={link[2]}>
          {link[1]}
        </Link>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

/* One column for the whole article — text, media and headings share the same
   edges, so nothing reads as inset. */
const COLUMN = "article-column";
const BLEED = "article-column";

function BlockView({ block, index, seed }: { block: Block; index: number; seed: string }) {
  switch (block.type) {
    case "heading":
      return block.level === 2 ? (
        <h2 className={cn(COLUMN, "t-h2 mb-4 mt-16")}>{inline(block.text, `h${index}`)}</h2>
      ) : (
        <h3 className={cn(COLUMN, "t-h3 mb-3 mt-12")}>{inline(block.text, `h${index}`)}</h3>
      );

    case "paragraph":
      return (
        <p className={cn(COLUMN, "t-body-lg mb-6 text-ink-muted")}>
          {inline(block.text, `p${index}`)}
        </p>
      );

    case "quote":
      return (
        <figure className={cn(BLEED, "my-16")}>
          <blockquote className="border-l-2 border-accent pl-6 sm:pl-8">
            <p className="t-h2 text-balance">{inline(block.text, `q${index}`)}</p>
          </blockquote>
          {block.attribution && (
            <figcaption className="t-label mt-4 pl-6 text-ink-faint sm:pl-8">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "highlight":
      return (
        <aside className={cn(COLUMN, "surface my-12 p-6")}>
          <p className="t-label mb-3 text-accent">Note</p>
          <p className="t-body-lg">{inline(block.text, `hl${index}`)}</p>
        </aside>
      );

    case "list":
      return block.ordered ? (
        <ol className={cn(COLUMN, "t-body-lg mb-8 space-y-3 text-ink-muted")}>
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="t-caption pt-[0.45em] font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{inline(item, `ol${index}-${i}`)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className={cn(COLUMN, "t-body-lg mb-8 space-y-3 text-ink-muted")}>
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] gap-2">
              <span aria-hidden="true" className="pt-[0.62em]">
                <span className="block h-1.5 w-1.5 rounded-pill bg-accent" />
              </span>
              <span>{inline(item, `ul${index}-${i}`)}</span>
            </li>
          ))}
        </ul>
      );

    case "image": {
      const generated = block.src.startsWith("art:");
      const tone = generated ? Number(block.src.slice(4)) || 0 : 0;
      const dims = imageSizes[block.src];
      return (
        <figure className={cn(BLEED, "my-16")}>
          {generated ? (
            <div className="media aspect-[16/9]">
              <CoverArt seed={`${seed}-${index}`} tone={tone} />
            </div>
          ) : (
            /* Real proportions, never upscaled past the source. Width and
               height are set so nothing shifts while the image loads. */
            <div
              className="media mx-auto"
              style={dims ? { maxWidth: `${dims[0]}px` } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt={block.alt}
                width={dims?.[0]}
                height={dims?.[1]}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          )}
          {(block.caption || block.alt) && (
            <figcaption className="t-caption mt-4 text-ink-faint">
              {block.caption ?? block.alt}
            </figcaption>
          )}
        </figure>
      );
    }

    case "embed": {
      const yt = youtubeId(block.url);
      return (
        <figure className={cn(BLEED, "my-16")}>
          <div className="media aspect-video bg-inverse">
            <iframe
              src={yt ? `https://www.youtube-nocookie.com/embed/${yt}` : block.url}
              title="Embedded media"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>
        </figure>
      );
    }

    case "divider":
      return (
        <div className={cn(COLUMN, "my-16 flex justify-center gap-2")} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-1 w-1 rounded-pill bg-ink-faint" />
          ))}
        </div>
      );
  }
}

export function ContentBody({ content, seed }: { content: string; seed: string }) {
  const blocks = parseContent(content);
  return (
    <div className="prose-body [&>*:first-child]:mt-0">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} index={i} seed={seed} />
      ))}
    </div>
  );
}
