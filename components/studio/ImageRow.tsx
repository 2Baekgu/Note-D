"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import { ImageRow as BaseImageRow } from "@/lib/content/nodes/image-row";

/** The editor's view of a row. `NodeViewContent` is what lets ProseMirror
 *  keep managing the pictures inside — dropping one in, dragging one out —
 *  and is the reason the row is a container node rather than a list of
 *  sources.
 *
 *  The caption is drawn but not edited here; the bubble menu owns it, the
 *  same way it owns a single picture's. */
function View({ node, editor, getPos }: NodeViewProps) {
  const caption = String(node.attrs.caption ?? "");
  const ref = useRef<HTMLElement>(null);

  /** Write a measured shape into the document.
   *
   *  Everything is looked up again here rather than closed over. A picture
   *  may finish loading long after the pass that asked for it — a caption
   *  typed in between rewrites the row on every keystroke — and acting on a
   *  remembered position would put one picture's address on another.
   *
   *  It is not an edit anyone made, so it stays out of the undo history. */
  const record = useCallback(
    (index: number, src: string, width: number, height: number) => {
      const pos = typeof getPos === "function" ? getPos() : null;
      if (pos === null || pos === undefined) return;

      const { state } = editor.view;
      const row = state.doc.nodeAt(pos);
      if (!row || row.type.name !== "imageRow" || index >= row.childCount)
        return;

      let at = pos + 1;
      for (let k = 0; k < index; k += 1) at += row.child(k).nodeSize;

      const current = state.doc.nodeAt(at);
      // The picture that was measured has to still be the picture that is
      // there, or this belongs to a row that has moved on.
      if (
        !current ||
        current.type.name !== "image" ||
        current.attrs.src !== src
      )
        return;
      if (current.attrs.width === width && current.attrs.height === height)
        return;

      editor.view.dispatch(
        state.tr
          .setNodeMarkup(at, undefined, { ...current.attrs, width, height })
          .setMeta("addToHistory", false),
      );
    },
    [editor, getPos],
  );

  /** Give every picture the width its own height asks for.
   *
   *  Published, the figure is the flex item and carries `flex-grow` as an
   *  inline style of its own. In the editor it is two levels down — every
   *  node view arrives wrapped, and ProseMirror adds one more around the lot
   *  — so the ratio has to be put on the wrapper by hand. */
  const share = useCallback(() => {
    const host = ref.current?.querySelector(".tiptap-row-items");
    if (!host) return;

    const items = host.querySelectorAll<HTMLElement>(
      ":scope > * > .react-renderer",
    );
    items.forEach((item, i) => {
      const child = i < node.childCount ? node.child(i) : null;
      if (!child) return;

      const w = Number(child.attrs.width) || 0;
      const h = Number(child.attrs.height) || 0;
      if (w > 0 && h > 0) {
        item.style.flexGrow = String(w / h);
        return;
      }

      const img = item.querySelector("img");
      if (!img) return;
      // One listener per picture. A caption being typed re-renders the row on
      // every keystroke, and without this each pass would queue another.
      if (img.dataset.measuring === "1") return;

      const measure = () => {
        img.dataset.measuring = "";
        if (!img.naturalWidth || !img.naturalHeight) return;
        item.style.flexGrow = String(img.naturalWidth / img.naturalHeight);
        // The raw attribute, not `img.src`: the browser resolves that to an
        // absolute URL while the document stores the path as written, and
        // comparing the two would reject every measurement.
        record(
          i,
          img.getAttribute("src") ?? "",
          img.naturalWidth,
          img.naturalHeight,
        );
      };

      if (img.complete) measure();
      else {
        img.dataset.measuring = "1";
        img.addEventListener("load", measure, { once: true });
      }
    });
  }, [node, record]);

  useEffect(share, [share]);

  return (
    <NodeViewWrapper
      ref={ref}
      as="figure"
      className="tiptap-row"
      data-count={node.childCount}
    >
      <NodeViewContent className="tiptap-row-items" />
      {caption && <figcaption contentEditable={false}>{caption}</figcaption>}
    </NodeViewWrapper>
  );
}

export const ImageRow = BaseImageRow.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
