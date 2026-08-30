"use client";

import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { Youtube as BaseYoutube, thumbUrl } from "@/lib/content/nodes/youtube";

/** The editor shows the still, not the player.
 *
 *  A live frame inside the editor swallows clicks meant for the document and
 *  starts a network connection for a video nobody is watching yet. The still
 *  says the same thing: this is the video, here is what it looks like. */
function View({ node, selected }: NodeViewProps) {
  const id = String(node.attrs.videoId ?? "");
  const title = String(node.attrs.title ?? "");

  return (
    <NodeViewWrapper
      as="figure"
      className="tiptap-video is-still"
      data-selected={selected}
      draggable
      data-drag-handle
    >
      <div className="tiptap-video-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbUrl(id)} alt={title || "YouTube"} draggable={false} />
        <span className="tiptap-video-play" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </div>
      {title && <figcaption contentEditable={false}>{title}</figcaption>}
    </NodeViewWrapper>
  );
}

export const Youtube = BaseYoutube.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
