import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import type { Extensions } from "@tiptap/core";

import { CaptionedImage } from "./nodes/captioned-image";
import { Bookmark } from "./nodes/bookmark";

/** Everything but the two custom nodes, which the editor swaps for versions
 *  carrying a React node view.
 *
 *  The editor and the article renderer build from the same list on purpose: a
 *  mark the renderer does not know about is a mark that disappears the moment
 *  a piece is published. */
export const baseExtensions: Extensions = [
  // StarterKit already carries bold, italic, underline, strike, lists,
  // blockquote, the rule and the link.
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    link: { openOnClick: false, HTMLAttributes: { rel: "noreferrer noopener" } },
  }),
  // Colour and typeface are inline styles on a <span>, which is what
  // TextStyle provides; both extensions write through it.
  TextStyle,
  Color,
  FontFamily,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight.configure({ multicolor: true }),
  TableKit.configure({ table: { resizable: true } }),
];

/** The schema-only nodes, for rendering a stored document outside React. */
export const renderExtensions: Extensions = [...baseExtensions, CaptionedImage, Bookmark];
