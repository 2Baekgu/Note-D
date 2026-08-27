import { BlueprintFrame } from "./BlueprintFrame";

/** Wraps a page in the blueprint: vertical frame lines down both content
 *  edges and serif headlines. The header and footer draw the corner squares
 *  on their own rules, so the page draws lines only. */
export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="blueprint serif-heads">
      <BlueprintFrame corners="none" />
      {children}
    </div>
  );
}
