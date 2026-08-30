import { Node, mergeAttributes } from "@tiptap/core";

/** Pictures standing side by side, under one caption.
 *
 *  A container rather than an image with extra sources: ProseMirror already
 *  knows how to drag a block node into and out of a container, so making the
 *  row hold real image nodes buys the whole in-and-out gesture for free. It
 *  also means the count limit is the schema's job — `image{1,5}` refuses a
 *  sixth without a line of code.
 *
 *  The caption is an attribute, not content. Two of the pictures having their
 *  own captions is exactly what a row is meant to replace. */
export const ImageRow = Node.create({
  name: "imageRow",
  group: "block",
  content: "image{1,5}",
  // Selecting inside the row should not wander into the paragraph outside it.
  isolating: true,
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      caption: {
        default: "",
        parseHTML: (element) =>
          element.querySelector(":scope > figcaption")?.textContent ?? "",
        // It is drawn as a <figcaption>, never as an attribute.
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "figure.tiptap-row" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const caption = String(node.attrs.caption ?? "");
    const attrs = mergeAttributes(HTMLAttributes, {
      class: "tiptap-row",
      // Lets the stylesheet decide how hard to squeeze five across a phone.
      "data-count": String(node.childCount),
    });
    const items = ["div", { class: "tiptap-row-items" }, 0];

    return caption
      ? ["figure", attrs, items, ["figcaption", {}, caption]]
      : ["figure", attrs, items];
  },
});
