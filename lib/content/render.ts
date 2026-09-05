import { generateHTML } from "@tiptap/html";
import { renderExtensions } from "./extensions";
import { blocksToDoc, isDoc, type DocNode } from "./doc";
import { parseContent } from "./parse";

/* Not server-only: the editor's preview and the bug-report list render the
   same body in the browser. */

/** A stored document, whichever format it is in. Anything written before the
 *  move to TipTap is read through the old parser on the way past. */
export function toDoc(content: string): DocNode {
  if (isDoc(content)) return JSON.parse(content.trim()) as DocNode;
  return blocksToDoc(parseContent(content));
}

/** The article's body as HTML, rendered from the same schema the editor
 *  writes with — which is the only way a mark the editor can apply is a mark
 *  a reader will actually see. */
/** Widths the optimizer is configured to produce. Anything else is refused,
 *  so these are taken from Next's own defaults rather than guessed. */
const WIDTHS = [640, 828, 1080, 1200, 1920];

/** Body pictures through the image optimizer, on the way to the page only.
 *
 *  A photograph off a phone is 4,032 pixels wide and four megabytes; the
 *  column it lands in is 768. The first article written since launch carried
 *  eight of them — 19.6MB to draw one page. Covers already go through
 *  `next/image`, but a body picture is markup generated from the stored
 *  document, not a React element, so it was going out whole.
 *
 *  Done here and not in the node's `renderHTML`, which the editor also uses:
 *  a rewritten src that parsed back into the document would replace the
 *  picture's own address with a link to a resizing service.
 *
 *  The original is kept on `data-full` so opening a picture still opens the
 *  picture, not the copy made to fit the column. */
function throughOptimiser(html: string): string {
  return html.replace(/<img\b([^>]*)>/g, (tag, attrs: string) => {
    const src = /(?:^|\s)src="([^"]*)"/.exec(attrs)?.[1];
    if (!src || /^(data:|art:)/.test(src) || src.includes("/_next/image")) return tag;

    const at = (w: number) =>
      `/_next/image?url=${encodeURIComponent(src)}&amp;w=${w}&amp;q=75`;
    const rest = attrs.replace(/(?:^|\s)src="[^"]*"/, "");

    return (
      `<img src="${at(1200)}"` +
      ` srcset="${WIDTHS.map((w) => `${at(w)} ${w}w`).join(", ")}"` +
      ` sizes="(min-width: 48rem) 768px, 100vw"` +
      ` loading="lazy" decoding="async" data-full="${src}"${rest}>`
    );
  });
}

export function contentToHtml(content: string): string {
  if (!content.trim()) return "";
  try {
    return throughOptimiser(generateHTML(toDoc(content), renderExtensions));
  } catch (error) {
    console.error("contentToHtml failed", error);
    return "";
  }
}
