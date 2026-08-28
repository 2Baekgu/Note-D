"use client";

import Image from "@tiptap/extension-image";
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";

/** TipTap's image is a bare `<img>`, so a caption written into `title` was
 *  invisible while writing and only appeared once published.
 *
 *  This draws the caption where the article draws it — centred, the width of
 *  the picture. The caption itself is not editable here on purpose: the
 *  bubble menu owns that. A second editable region inside a node view is
 *  exactly the kind of focus tangle that moving to TipTap was meant to end. */
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

export const CaptionedImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
