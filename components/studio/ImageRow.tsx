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

  /** Give every picture the width its own height asks for.
   *
   *  Published, the figure is the flex item and carries `flex-grow` as an
   *  inline style of its own. In the editor it is two levels down — every
   *  node view arrives wrapped, and ProseMirror adds one more around the lot
   *  — so the ratio has to be put on the wrapper by hand.
   *
   *  A picture whose shape the document does not know yet is measured once it
   *  has loaded and the answer written back, so the published page inherits
   *  it without anyone having to re-save on purpose. */
  const share = useCallback(() => {
    const host = ref.current?.querySelector(".tiptap-row-items");
    if (!host) return;

    const items = host.querySelectorAll<HTMLElement>(":scope > * > .react-renderer");
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
      const measure = () => {
        if (!img.naturalWidth || !img.naturalHeight) return;
        item.style.flexGrow = String(img.naturalWidth / img.naturalHeight);

        // Write it into the document so it survives publishing. Positions are
        // resolved fresh: the row may have moved since this ran.
        const pos = typeof getPos === "function" ? getPos() : null;
        if (pos === null || pos === undefined) return;
        let at = pos + 1;
        for (let k = 0; k < i; k += 1) at += node.child(k).nodeSize;
        editor.view.dispatch(
          editor.view.state.tr.setNodeMarkup(at, undefined, {
            ...child.attrs,
            width: img.naturalWidth,
            height: img.naturalHeight,
          }),
        );
      };
      if (img.complete) measure();
      else img.addEventListener("load", measure, { once: true });
    });
  }, [node, editor, getPos]);

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
