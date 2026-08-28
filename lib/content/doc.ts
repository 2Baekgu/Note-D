import {
  blocksToPlainText,
  parseContent,
  readingTimeOf,
  youtubeId,
  type Block,
} from "./parse";

/** Articles are edited in TipTap now, which speaks its own JSON document.
 *
 *  Nothing downstream had to learn it: everything still renders `Block[]`,
 *  and this module is the only place that knows a document can arrive in two
 *  shapes. The 32 imported articles stay exactly as they were written — they
 *  are read through the old parser until someone edits one, and only then is
 *  it stored as JSON. No migration, no flag day.
 *
 *  Inline emphasis stays as the dialect's markers inside `Block.text`, so
 *  `ContentBody`'s renderer is untouched. */

export interface DocNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

/** TipTap docs are objects; the old dialect never starts with a brace. */
export function isDoc(content: string): boolean {
  const trimmed = content.trim();
  if (!trimmed.startsWith("{")) return false;
  try {
    return (JSON.parse(trimmed) as DocNode).type === "doc";
  } catch {
    return false;
  }
}

/** The one entry point. Give it whatever is stored; get blocks back. */
export function toBlocks(content: string): Block[] {
  if (!isDoc(content)) return parseContent(content);
  try {
    return docToBlocks(JSON.parse(content.trim()) as DocNode);
  } catch {
    return [];
  }
}

/* ── TipTap → Block[] ─────────────────────────────────────── */

const MARK_WRAP: Record<string, [string, string]> = {
  bold: ["**", "**"],
  italic: ["*", "*"],
  code: ["`", "`"],
  highlight: ["==", "=="],
};

/** A node's text with the dialect's inline markers put back around it. */
function inlineOf(node: DocNode | undefined): string {
  if (!node?.content) return node?.text ?? "";

  return node.content
    .map((child) => {
      if (child.type === "hardBreak") return " ";
      if (child.type !== "text") return inlineOf(child);

      let text = child.text ?? "";
      for (const mark of child.marks ?? []) {
        const wrap = MARK_WRAP[mark.type];
        if (wrap && text.trim()) {
          text = `${wrap[0]}${text}${wrap[1]}`;
        } else if (mark.type === "link") {
          const href = mark.attrs?.href;
          if (typeof href === "string" && href) text = `[${text}](${href})`;
        }
      }
      return text;
    })
    .join("");
}

/** A quote's last line, when it opens with a dash, is its attribution —
 *  the same convention the dialect uses. */
function splitQuote(node: DocNode): { text: string; attribution?: string } {
  const paras = (node.content ?? []).map(inlineOf).filter((t) => t.trim());
  if (paras.length > 1 && /^[—–-]\s?\S/.test(paras[paras.length - 1])) {
    return {
      text: paras.slice(0, -1).join(" "),
      attribution: paras[paras.length - 1].replace(/^[—–-]\s?/, ""),
    };
  }
  return { text: paras.join(" ") };
}

export function docToBlocks(doc: DocNode): Block[] {
  const blocks: Block[] = [];

  for (const node of doc.content ?? []) {
    switch (node.type) {
      case "heading": {
        const level = Number(node.attrs?.level) === 3 ? 3 : 2;
        blocks.push({ type: "heading", level, text: inlineOf(node) });
        break;
      }

      case "paragraph": {
        const text = inlineOf(node).trim();
        if (!text) break;
        // `@embed <url>` on its own line stays the way to add a video.
        const embed = text.match(/^@embed\s+(\S+)$/);
        if (embed) {
          blocks.push({
            type: "embed",
            url: embed[1],
            provider: youtubeId(embed[1]) ? "youtube" : "iframe",
          });
          break;
        }
        blocks.push({ type: "paragraph", text });
        break;
      }

      case "blockquote":
        blocks.push({ type: "quote", ...splitQuote(node) });
        break;

      case "bulletList":
      case "orderedList": {
        const items = (node.content ?? [])
          .map((li) => (li.content ?? []).map(inlineOf).join(" ").trim())
          .filter(Boolean);
        if (items.length) {
          blocks.push({ type: "list", ordered: node.type === "orderedList", items });
        }
        break;
      }

      case "image": {
        const src = String(node.attrs?.src ?? "");
        if (!src) break;
        const caption = node.attrs?.title;
        blocks.push({
          type: "image",
          src,
          alt: String(node.attrs?.alt ?? ""),
          caption: typeof caption === "string" && caption ? caption : undefined,
        });
        break;
      }

      case "horizontalRule":
        blocks.push({ type: "divider" });
        break;

      default:
        break;
    }
  }

  return blocks;
}

/* ── Block[] → TipTap ─────────────────────────────────────── */

const PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|==[^=]+==|\[[^\]]+\]\([^)\s]+\))/g;

/** Markers back into marked text nodes, so a legacy article opens in the
 *  editor already bold where it was bold. */
function textNodes(text: string): DocNode[] {
  if (!text) return [];
  return text
    .split(PATTERN)
    .filter((p) => p !== undefined && p !== "")
    .map((part): DocNode => {
      if (/^\*\*[^*]+\*\*$/.test(part))
        return { type: "text", text: part.slice(2, -2), marks: [{ type: "bold" }] };
      if (/^\*[^*]+\*$/.test(part))
        return { type: "text", text: part.slice(1, -1), marks: [{ type: "italic" }] };
      if (/^`[^`]+`$/.test(part))
        return { type: "text", text: part.slice(1, -1), marks: [{ type: "code" }] };
      if (/^==[^=]+==$/.test(part))
        return { type: "text", text: part.slice(2, -2), marks: [{ type: "highlight" }] };
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link)
        return {
          type: "text",
          text: link[1],
          marks: [{ type: "link", attrs: { href: link[2] } }],
        };
      return { type: "text", text: part };
    });
}

const para = (text: string): DocNode => ({
  type: "paragraph",
  ...(text ? { content: textNodes(text) } : {}),
});

export function blocksToDoc(blocks: Block[]): DocNode {
  const content: DocNode[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading":
        content.push({
          type: "heading",
          attrs: { level: block.level },
          content: textNodes(block.text),
        });
        break;

      case "paragraph":
      case "highlight":
        // The dialect's callout has no TipTap equivalent; it reads as a
        // paragraph, which is what it always was underneath.
        content.push(para(block.text));
        break;

      case "quote": {
        const inner = [para(block.text)];
        if (block.attribution) inner.push(para(`— ${block.attribution}`));
        content.push({ type: "blockquote", content: inner });
        break;
      }

      case "list":
        content.push({
          type: block.ordered ? "orderedList" : "bulletList",
          content: block.items.map((item) => ({
            type: "listItem",
            content: [para(item)],
          })),
        });
        break;

      case "image":
        content.push({
          type: "image",
          attrs: {
            src: block.src,
            alt: block.alt,
            title: block.caption ?? null,
          },
        });
        break;

      case "embed":
        content.push(para(`@embed ${block.url}`));
        break;

      case "divider":
        content.push({ type: "horizontalRule" });
        break;
    }
  }

  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] };
}

export const serializeDoc = (doc: DocNode): string => JSON.stringify(doc);

/* ── Format-agnostic helpers ──────────────────────────────── */

/** Plain words of a document, whichever format it is stored in. */
export const toPlainText = (content: string): string =>
  blocksToPlainText(toBlocks(content));

export const readingTime = (content: string): number =>
  readingTimeOf(toPlainText(content));

/** The opening sentence of a document. The editor no longer asks for a
 *  subtitle, so an article without one is summarised by its first line. */
export function firstLine(content: string): string {
  for (const block of toBlocks(content)) {
    if (block.type !== "paragraph") continue;
    const text = block.text.trim();
    if (text) return text;
  }
  return "";
}
