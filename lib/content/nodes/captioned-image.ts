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
  renderHTML({ HTMLAttributes, node }) {
    const caption = String(node.attrs.title ?? "");
    const img = ["img", mergeAttributes(HTMLAttributes, { draggable: "false" })];
    return caption
      ? ["figure", { class: "tiptap-figure" }, img, ["figcaption", {}, caption]]
      : ["figure", { class: "tiptap-figure" }, img];
  },
});
