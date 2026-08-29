import { contentToHtml } from "@/lib/content/render";

/** The article body.
 *
 *  Rendered from the stored TipTap document through the editor's own schema,
 *  so alignment, colour, underline, tables — everything the toolbar can
 *  apply — survives publishing. It used to go through a second, smaller block
 *  model that only knew a handful of shapes, and anything outside that set
 *  quietly vanished on the way to the page.
 *
 *  The markup comes from that schema and never from user-supplied HTML, which
 *  is what makes setting it here safe: a document can only contain nodes and
 *  marks the schema defines, and each of those renders markup we wrote. */
export function ContentBody({
  content,
}: {
  content: string;
  /** Kept for callers that still pass it; nothing is generated from it now. */
  seed?: string;
}) {
  const html = contentToHtml(content);
  if (!html) return null;

  return (
    <div
      className="prose-body [&>*:first-child]:mt-0"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
