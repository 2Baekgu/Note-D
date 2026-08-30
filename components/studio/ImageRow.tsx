"use client";

import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import { ImageRow as BaseImageRow } from "@/lib/content/nodes/image-row";

/** The editor's view of a row. `NodeViewContent` is what lets ProseMirror
 *  keep managing the images inside — dropping one in, dragging one out — and
 *  is the reason the row is a container node rather than a list of sources.
 *
 *  The caption is drawn but not edited here; the bubble menu owns it, the
 *  same way it owns a single picture's. */
function View({ node, selected }: NodeViewProps) {
  const caption = String(node.attrs.caption ?? "");

  return (
    <NodeViewWrapper
      as="figure"
      className="tiptap-row"
      data-count={node.childCount}
      data-selected={selected}
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
