import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";

/** An image with its caption, drawn as a `<figure>` on both sides.
 *
 *  TipTap's image is a bare `<img>`, so a caption written into `title` was
 *  invisible while writing and only appeared once published. The caption
 *  lives in `title` because that is where the article renderer already reads
 *  it from. The editor extends this with a node view; the schema is here so
 *  the server can render the same markup without React. */
export const CaptionedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      // The picture's own shape, kept so a row can give each one the width
      // its height asks for. Also stops the page jumping as pictures load.
      width: {
        default: null,
        parseHTML: (el) => Number(el.getAttribute("width")) || null,
        renderHTML: (attrs) => (attrs.width ? { width: String(attrs.width) } : {}),
      },
      height: {
        default: null,
        parseHTML: (el) => Number(el.getAttribute("height")) || null,
        renderHTML: (attrs) => (attrs.height ? { height: String(attrs.height) } : {}),
      },
    };
  },

  renderHTML({ HTMLAttributes, node }) {
    const caption = String(node.attrs.title ?? "");
    const img = ["img", mergeAttributes(HTMLAttributes, { draggable: "false" })];

    // Inside a row the figure is the flex item, and growing each one by its
    // own width-to-height ratio is what makes the pictures share a height
    // while the row still fills the column. Outside a row `flex-grow` means
    // nothing, so this is free to be here always.
    const w = Number(node.attrs.width) || 0;
    const h = Number(node.attrs.height) || 0;
    const style = w > 0 && h > 0 ? { style: `flex-grow:${(w / h).toFixed(4)}` } : {};

    return caption
      ? ["figure", { class: "tiptap-figure", ...style }, img, ["figcaption", {}, caption]]
      : ["figure", { class: "tiptap-figure", ...style }, img];
  },
});
