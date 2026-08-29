import { Node, mergeAttributes } from "@tiptap/core";

/** A link rendered as a card — thumbnail, title, description, domain. The
 *  metadata is fetched once, when the link is pasted, and stored on the node,
 *  so a reader never waits on someone else's server. */

const str = (name: string) => ({
  default: "",
  parseHTML: (el: HTMLElement) => el.getAttribute(`data-${name}`) ?? "",
  renderHTML: (attrs: Record<string, unknown>) =>
    attrs[name] ? { [`data-${name}`]: String(attrs[name]) } : {},
});

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
    return [{ tag: "a[data-bookmark]" }, { tag: "div[data-bookmark]" }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const a = node.attrs as Record<string, string>;
    const text: (string | unknown[])[] = [["span", { class: "bookmark-title" }, a.title || a.url]];
    if (a.description) text.push(["span", { class: "bookmark-desc" }, a.description]);
    if (a.site) text.push(["span", { class: "bookmark-site" }, a.site]);

    const children: unknown[] = [];
    if (a.image) {
      children.push([
        "span",
        { class: "bookmark-thumb" },
        ["img", { src: a.image, alt: "", loading: "lazy" }],
      ]);
    }
    children.push(["span", { class: "bookmark-text" }, ...text]);

    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-bookmark": "",
        class: "bookmark",
        href: a.url,
        target: "_blank",
        rel: "noreferrer noopener",
      }),
      ...children,
    ];
  },
});
