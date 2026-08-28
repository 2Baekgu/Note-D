import type { Block } from "./parse";

/** The inverse of `parseContent`. The block editor works on `Block[]` and
 *  writes back through here, so what gets stored stays the same dialect the
 *  32 imported articles are written in — nothing else in the app has to know
 *  an editor changed.
 *
 *  Round-trips on meaning, not on bytes: `parseContent` joins the lines of a
 *  paragraph with a space, so the original wrapping is already gone by the
 *  time a block exists. What must hold is
 *  `parse(serialize(parse(x)))` deep-equals `parse(x)`, which
 *  `scripts/check-roundtrip.mjs` asserts against all 32 articles. */
export function serializeBlocks(blocks: Block[]): string {
  return blocks
    .map(blockToText)
    .filter((text) => text.length > 0)
    .join("\n\n");
}

export function blockToText(block: Block): string {
  switch (block.type) {
    case "heading":
      return `${"#".repeat(block.level)} ${block.text}`.trim();

    case "paragraph":
      return block.text.trim();

    case "quote": {
      const lines = [`> ${block.text}`.trim()];
      if (block.attribution?.trim()) lines.push(`> — ${block.attribution.trim()}`);
      return lines.join("\n");
    }

    case "list":
      return block.items
        .map((item, i) => (block.ordered ? `${i + 1}. ${item}` : `- ${item}`))
        .join("\n");

    case "image": {
      const caption = block.caption?.trim();
      return `![${block.alt}](${block.src}${caption ? ` "${caption}"` : ""})`;
    }

    case "highlight":
      return `!! ${block.text}`.trim();

    case "embed":
      return `@embed ${block.url}`;

    case "divider":
      return "---";
  }
}
