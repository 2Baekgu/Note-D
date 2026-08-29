/** A very small editorial markdown dialect.
 *
 *  ##  / ###        heading
 *  >                quote        (a following line starting with "—" becomes the attribution)
 *  -                bullet list
 *  1.               numbered list
 *  ![alt](src)      image        (append  "caption"  inside the parens for a caption)
 *  !!               highlight / callout
 *  @embed <url>     YouTube or other iframe embed
 *  ---              divider
 *  anything else    paragraph
 *
 *  Inline: **bold**  *italic*  `code`  [text](url)  ==marked==
 */

export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "highlight"; text: string }
  | { type: "embed"; url: string; provider: "youtube" | "iframe" }
  | {
      type: "bookmark";
      url: string;
      title: string;
      description: string;
      image: string;
      site: string;
    }
  | { type: "divider" };

const YT =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/;

export function youtubeId(url: string): string | null {
  const m = url.match(YT);
  return m ? m[1] : null;
}

export function parseContent(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      flush();
      continue;
    }

    // Divider
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      flush();
      blocks.push({ type: "divider" });
      continue;
    }

    // Heading
    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({
        type: "heading",
        level: heading[1].length === 2 ? 2 : 3,
        text: heading[2].trim(),
      });
      continue;
    }

    // Image
    const image = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (image) {
      flush();
      blocks.push({
        type: "image",
        alt: image[1],
        src: image[2],
        caption: image[3],
      });
      continue;
    }

    // Embed
    const embed = line.match(/^@embed\s+(\S+)/);
    if (embed) {
      flush();
      blocks.push({
        type: "embed",
        url: embed[1],
        provider: youtubeId(embed[1]) ? "youtube" : "iframe",
      });
      continue;
    }

    // Highlight
    if (line.startsWith("!!")) {
      flush();
      blocks.push({ type: "highlight", text: line.slice(2).trim() });
      continue;
    }

    // Quote (+ optional attribution on the next quoted line)
    if (line.startsWith(">")) {
      flush();
      const quoted: string[] = [];
      let attribution: string | undefined;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        const body = lines[i].trim().replace(/^>\s?/, "");
        if (/^[—–-]\s?\S/.test(body)) attribution = body.replace(/^[—–-]\s?/, "");
        else if (body) quoted.push(body);
        i++;
      }
      i--;
      blocks.push({ type: "quote", text: quoted.join(" "), attribution });
      continue;
    }

    // Lists
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flush();
      const ordered = Boolean(numbered);
      const items: string[] = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        const b = t.match(/^[-*]\s+(.*)$/);
        const n = t.match(/^\d+[.)]\s+(.*)$/);
        if (ordered && n) items.push(n[1]);
        else if (!ordered && b) items.push(b[1]);
        else break;
        i++;
      }
      i--;
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    paragraph.push(line);
  }

  flush();
  return blocks;
}

/** Plain text of already-parsed blocks. `lib/content/doc.ts` wraps this with
 *  the format detection; nothing should call it with raw source. */
export function blocksToPlainText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading":
        case "paragraph":
        case "quote":
        case "highlight":
          return b.text;
        case "list":
          return b.items.join(" ");
        // A bookmark's title is what a reader would call the link, so search
        // and the reading-time count should both see it.
        case "bookmark":
          return `${b.title} ${b.description}`;
        default:
          return "";
      }
    })
    .join(" ")
    .replace(/[*`>=\[\]]|\((https?:[^)]+)\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Korean reads at roughly 350 chars/min; English at ~230 words/min. */
export function readingTimeOf(text: string): number {
  const korean = (text.match(/[가-힣]/g) || []).length;
  const words = text.replace(/[가-힣]/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(korean / 350 + words / 230));
}
