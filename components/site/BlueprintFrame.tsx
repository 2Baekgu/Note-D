/** Layers 3 + 4 of the blueprint background: the vertical frame lines and a
 *  square at each corner, matching the squares drawn where a section rule
 *  crosses the frame. Decorative — put it inside an element carrying
 *  `.blueprint`.
 *
 *  Which corners to draw depends on who owns the rule the square straddles:
 *  the header draws the top pair (it paints over the page, so the squares
 *  have to live inside it to show their upper half), the footer the bottom
 *  pair, and the page itself draws none. */
export function BlueprintFrame({
  corners = "all",
}: {
  corners?: "all" | "top" | "bottom" | "none";
}) {
  const top = corners === "all" || corners === "top";
  const bottom = corners === "all" || corners === "bottom";

  return (
    <div className="blueprint-frame" aria-hidden="true">
      {top && (
        <>
          <span className="blueprint-corner blueprint-corner-tl" />
          <span className="blueprint-corner blueprint-corner-tr" />
        </>
      )}
      {bottom && (
        <>
          <span className="blueprint-corner blueprint-corner-bl" />
          <span className="blueprint-corner blueprint-corner-br" />
        </>
      )}
    </div>
  );
}
