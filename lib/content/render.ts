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
export function contentToHtml(content: string): string {
  if (!content.trim()) return "";
  try {
    return generateHTML(toDoc(content), renderExtensions);
  } catch (error) {
    console.error("contentToHtml failed", error);
    return "";
  }
}
