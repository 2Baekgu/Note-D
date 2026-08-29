"use client";

import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { CaptionedImage as BaseImage } from "@/lib/content/nodes/captioned-image";

/** The editor's view of the shared image node. The caption is not editable
 *  here on purpose: the bubble menu owns it. A second editable region inside
 *  a node view is exactly the focus tangle that moving to TipTap ended. */
function View({ node, selected }: NodeViewProps) {
  const src = String(node.attrs.src ?? "");
  const alt = String(node.attrs.alt ?? "");
  const caption = String(node.attrs.title ?? "");

  return (
    <NodeViewWrapper as="figure" className="tiptap-figure" data-selected={selected}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} draggable={false} />
      {caption && <figcaption contentEditable={false}>{caption}</figcaption>}
    </NodeViewWrapper>
  );
}

export const CaptionedImage = BaseImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
