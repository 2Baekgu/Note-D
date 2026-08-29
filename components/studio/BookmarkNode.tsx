"use client";

import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { Bookmark as BaseBookmark } from "@/lib/content/nodes/bookmark";
import { BookmarkCard } from "@/components/content/BookmarkCard";

function View({ node, selected }: NodeViewProps) {
  const attrs = node.attrs as Record<string, string>;
  return (
    <NodeViewWrapper
      className="tiptap-bookmark"
      data-selected={selected ? "true" : undefined}
      // The card's text is fetched metadata, not something being written —
      // the browser should not squiggle it.
      spellCheck={false}
    >
      <BookmarkCard
        url={attrs.url}
        title={attrs.title}
        description={attrs.description}
        image={attrs.image}
        site={attrs.site}
        // Inside the editor the card is content to be selected and deleted,
        // not a link to follow.
        inert
      />
    </NodeViewWrapper>
  );
}

export const Bookmark = BaseBookmark.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
