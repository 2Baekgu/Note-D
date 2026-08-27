/** Full-bleed section rule with a small square where it crosses each
 *  vertical frame line. Decorative. */
export function GridRule() {
  return (
    <div className="grid-rule" aria-hidden="true">
      <div className="grid-rule-inner">
        <span className="grid-node grid-node-l" />
        <span className="grid-node grid-node-r" />
      </div>
    </div>
  );
}
