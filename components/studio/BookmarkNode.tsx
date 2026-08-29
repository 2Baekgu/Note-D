"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { BookmarkCard } from "@/components/content/BookmarkCard";

/** A link rendered as a card — thumbnail, title, description, domain — the
 *  way a chat app expands one. Stored as a node so the metadata is fetched
 *  once, when it is pasted, and never again at read time. */

const str = (name: string) => ({
  default: "",
  parseHTML: (el: HTMLElement) => el.getAttribute(`data-${name}`) ?? "",
  renderHTML: (attrs: Record<string, unknown>) =>
    attrs[name] ? { [`data-${name}`]: String(attrs[name]) } : {},
});

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

export const Bookmark = Node.create({
  name: "bookmark",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: str("url"),
      title: str("title"),
      description: str("description"),
      image: str("image"),
      site: str("site"),
    };
  },

  parseHTML() {
    return [{ tag: "div[data-bookmark]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-bookmark": "" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
