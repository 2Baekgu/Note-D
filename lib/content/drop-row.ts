import { NodeSelection } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";
import type { Node as PMNode, Slice } from "@tiptap/pm/model";

/** Dropping a picture beside another picture.
 *
 *  Adjacency alone cannot mean "side by side" — two pictures stacked one
 *  above the other are adjacent too. What separates the two is where the
 *  pointer was: inside a picture's own height, on its left or right. That is
 *  the whole rule, and it is why this runs on drop rather than on the
 *  document afterwards. */

const MAX = 5;

/** Where a file dropped into the sheet should land: under the pointer if it
 *  is over the text, and at the end when it is over the margin. */
export function dropPos(view: EditorView, event: DragEvent): number | null {
  const hit = view.posAtCoords({ left: event.clientX, top: event.clientY });
  return hit ? hit.pos : null;
}

/** The single image being dragged, if that is what this is. */
function draggedImage(slice: Slice): PMNode | null {
  if (slice.content.childCount !== 1) return null;
  const node = slice.content.firstChild;
  return node && node.type.name === "image" ? node : null;
}

/** The top-level image, or the image inside a row, under the pointer. */
function targetImage(view: EditorView, event: DragEvent) {
  const hit = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!hit) return null;

  const $pos = view.state.doc.resolve(hit.inside >= 0 ? hit.inside : hit.pos);
  for (let d = $pos.depth; d >= 0; d -= 1) {
    const node = d === 0 ? null : $pos.node(d);
    // An image is a leaf, so it is never on the ancestor chain — look at the
    // node the position sits directly before, and at the one it is inside.
    const candidates: { node: PMNode | null; pos: number }[] = [
      { node: view.state.doc.nodeAt($pos.pos), pos: $pos.pos },
      { node, pos: d === 0 ? -1 : $pos.before(d) },
    ];
    for (const c of candidates) {
      if (c.node?.type.name === "image" && c.pos >= 0) return c.pos;
    }
  }
  return null;
}

/** Left or right of the target's midline — and only if the pointer is within
 *  its height. Above or below means the person meant to stack them. */
function sideOf(view: EditorView, pos: number, event: DragEvent): "before" | "after" | null {
  const dom = view.nodeDOM(pos);
  if (!(dom instanceof HTMLElement)) return null;
  const box = dom.getBoundingClientRect();
  if (event.clientY < box.top || event.clientY > box.bottom) return null;
  return event.clientX < box.left + box.width / 2 ? "before" : "after";
}

/** Where a vertical mark should be drawn while a picture is being dragged
 *  beside another, in viewport coordinates. `null` means this drop is an
 *  ordinary one and ProseMirror's own horizontal cursor is right.
 *
 *  A row lays its pictures out across the line, so the gap they would fall
 *  into is a gap between columns. A horizontal rule drawn under a picture
 *  says "it will go below", which is the one thing that will not happen. */
export function rowDropMark(
  view: EditorView,
  event: DragEvent,
): { left: number; top: number; height: number } | null {
  const targetPos = targetImage(view, event);
  if (targetPos === null) return null;

  const side = sideOf(view, targetPos, event);
  if (!side) return null;

  const dom = view.nodeDOM(targetPos);
  if (!(dom instanceof HTMLElement)) return null;
  const box = dom.getBoundingClientRect();

  return {
    left: side === "before" ? box.left : box.right,
    top: box.top,
    height: box.height,
  };
}

export function dropIntoRow(
  view: EditorView,
  event: DragEvent,
  slice: Slice,
  moved: boolean,
): boolean {
  const image = draggedImage(slice);
  if (!image) return false;

  const targetPos = targetImage(view, event);
  if (targetPos === null) return false;

  const side = sideOf(view, targetPos, event);
  if (!side) return false;

  const { state } = view;
  const $target = state.doc.resolve(targetPos);
  const parent = $target.parent;
  const inRow = parent.type.name === "imageRow";
  if (inRow && parent.childCount >= MAX) return false;

  const rowType = state.schema.nodes.imageRow;
  const target = state.doc.nodeAt(targetPos);
  if (!rowType || !target) return false;

  // Dropping a picture onto itself is a no-op, not a row of one.
  const sel = state.selection;
  const sourceIsTarget =
    sel instanceof NodeSelection && sel.from === targetPos && moved;
  if (sourceIsTarget) return false;

  const tr = state.tr;

  // Take the picture out of its old place first, then work in the positions
  // that leaves behind.
  if (moved && sel instanceof NodeSelection && sel.node.type.name === "image") {
    tr.delete(sel.from, sel.to);
  }

  const at = tr.mapping.map(targetPos);
  const stillThere = tr.doc.nodeAt(at);
  if (!stillThere || stillThere.type.name !== "image") return false;

  // A picture inside a row already has somewhere to go.
  if (inRow) {
    tr.insert(side === "before" ? at : at + stillThere.nodeSize, image);
  } else {
    // A lone picture becomes a row of two. Its caption belongs to the row
    // now — inside one, a picture never carries its own.
    const pair =
      side === "before"
        ? [image, stillThere.type.create({ ...stillThere.attrs, title: null })]
        : [stillThere.type.create({ ...stillThere.attrs, title: null }), image];
    tr.replaceWith(
      at,
      at + stillThere.nodeSize,
      rowType.create({ caption: stillThere.attrs.title ?? "" }, pair),
    );
  }

  event.preventDefault();
  view.dispatch(tr.scrollIntoView());
  return true;
}
