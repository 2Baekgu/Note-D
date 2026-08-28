import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The name is a face — `:D` is doing the work, so it gets the accent and
 *  the rest of the word stays in ink. Split on the last colon so the mark
 *  keeps working if the name is ever edited in lib/site.ts. */
export function Wordmark({ className }: { className?: string }) {
  const at = site.name.lastIndexOf(":");
  const word = at > 0 ? site.name.slice(0, at) : site.name;
  const face = at > 0 ? site.name.slice(at) : "";

  return (
    <span className={cn("wordmark", className)}>
      {word}
      {face && <span className="text-accent">{face}</span>}
    </span>
  );
}
