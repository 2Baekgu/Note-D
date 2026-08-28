/** Inline formatting, both directions.
 *
 *  The editor writes into a `contenteditable`, so what the browser hands back
 *  is HTML — but everything downstream stores and renders the dialect's
 *  markers. These two functions are the bridge, and they have to agree with
 *  the `inline()` renderer in `components/content/ContentBody.tsx`.
 *
 *      **bold**   *italic*   `code`   ==marked==   [text](url)
 */

const PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\([^)\s]+\))/g;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Marker text → HTML, for seeding the editable surface. */
export function inlineToHtml(text: string): string {
  const html = text
    .split(PATTERN)
    .filter((p) => p !== undefined && p !== "")
    .map((part) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`;
      if (/^\*[^*]+\*$/.test(part)) return `<em>${escapeHtml(part.slice(1, -1))}</em>`;
      if (/^`[^`]+`$/.test(part)) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      if (/^==[^=]+==$/.test(part)) return `<mark>${escapeHtml(part.slice(2, -2))}</mark>`;
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        return `<a href="${escapeHtml(link[2])}">${escapeHtml(link[1])}</a>`;
      }
      return escapeHtml(part);
    })
    .join("");
  return html;
}

/** Markers only wrap visible text, so `**bold **` would round-trip badly.
 *  Push the outer spaces back outside the marker. */
function wrap(inner: string, open: string, close = open): string {
  const body = inner.trim();
  if (!body) return inner;
  const lead = inner.slice(0, inner.length - inner.trimStart().length);
  const tail = inner.slice(inner.trimEnd().length);
  return `${lead}${open}${body}${close}${tail}`;
}

/** HTML → marker text, walking the live nodes rather than parsing a string.
 *  The browser produces `<b>`/`<i>` from its own formatting commands and any
 *  amount of `<span>` and `<div>` from a paste, so unknown elements simply
 *  pass their children through. */
export function nodeToInline(node: Node): string {
  if (node.nodeType === 3 /* text */) return node.nodeValue ?? "";
  if (node.nodeType !== 1 /* element */) return "";

  const el = node as HTMLElement;
  const inner = Array.from(el.childNodes).map(nodeToInline).join("");

  switch (el.tagName) {
    case "STRONG":
    case "B":
      return wrap(inner, "**");
    case "EM":
    case "I":
      return wrap(inner, "*");
    case "CODE":
      return wrap(inner, "`");
    case "MARK":
      return wrap(inner, "==");
    case "A": {
      const href = el.getAttribute("href");
      const body = inner.trim();
      return href && body ? `[${body}](${href})` : inner;
    }
    case "BR":
      return " ";
    default:
      return inner;
  }
}

/** The editable element's current content, as dialect text. */
export function elementToInline(el: HTMLElement): string {
  return Array.from(el.childNodes)
    .map(nodeToInline)
    .join("")
    .replace(/ /g, " ") // contenteditable loves a non-breaking space
    .replace(/\s+/g, " ")
    .trim();
}
