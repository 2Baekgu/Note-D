import { Extension } from "@tiptap/core";

/** Extra attributes on nodes StarterKit owns, so the toolbar's choices are
 *  part of the document rather than a class the renderer has to guess at.
 *
 *  Each is written as a `data-` attribute and styled in one place, which is
 *  what lets the editor and the published page look the same. */

const attr = (name: string, allowed: readonly string[]) => ({
  default: null as string | null,
  parseHTML: (el: HTMLElement) => {
    const v = el.getAttribute(`data-${name}`);
    return v && allowed.includes(v) ? v : null;
  },
  renderHTML: (attrs: Record<string, unknown>) =>
    attrs[name] ? { [`data-${name}`]: String(attrs[name]) } : {},
});

/** 본문1 / 본문2 / 본문3 — the three body sizes the block menu offers. */
export const PARAGRAPH_SIZES = ["1", "2", "3"] as const;

/** The quote shapes from the reference: a centred pull quote, a bar down the
 *  left, and a boxed one. */
export const QUOTE_VARIANTS = ["pull", "bar", "box"] as const;

/** Bullet, hollow bullet, and the numbered list handled by orderedList. */
export const LIST_VARIANTS = ["disc", "circle"] as const;

/** The rules from the reference: dots, a short heavy stroke, a wave, a full
 *  hairline, and two with a mark set into them. */
export const RULE_VARIANTS = ["dots", "heavy", "wave", "line", "diamond", "ring"] as const;

export const BlockVariants = Extension.create({
  name: "blockVariants",

  addGlobalAttributes() {
    return [
      { types: ["paragraph"], attributes: { size: attr("size", PARAGRAPH_SIZES) } },
      { types: ["blockquote"], attributes: { variant: attr("variant", QUOTE_VARIANTS) } },
      { types: ["bulletList"], attributes: { variant: attr("variant", LIST_VARIANTS) } },
      { types: ["horizontalRule"], attributes: { variant: attr("variant", RULE_VARIANTS) } },
    ];
  },
});
