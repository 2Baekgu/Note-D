/** A link as a card: thumbnail on the left, title, description and domain on
 *  the right. Shared by the editor and the published article so what you see
 *  while writing is what a reader gets. */
export function BookmarkCard({
  url,
  title,
  description,
  image,
  site,
  inert = false,
}: {
  url: string;
  title: string;
  description: string;
  image: string;
  site: string;
  /** In the editor the card is a block to select, not a link to follow. */
  inert?: boolean;
}) {
  const body = (
    <>
      {image && (
        <span className="bookmark-thumb">
          {/* Not next/image: the source is whatever domain was linked, and a
              remote host would have to be allow-listed to be optimised. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" loading="lazy" />
        </span>
      )}
      <span className="bookmark-text">
        <span className="bookmark-title">{title || url}</span>
        {description && <span className="bookmark-desc">{description}</span>}
        <span className="bookmark-site">{site}</span>
      </span>
    </>
  );

  if (inert) {
    return <span className="bookmark">{body}</span>;
  }

  return (
    <a className="bookmark" href={url} target="_blank" rel="noreferrer noopener">
      {body}
    </a>
  );
}
