import { cn } from "@/lib/utils";

/** The one rule in the system: 1px, --line. `inverse` for dark surfaces. */
export function Divider({
  className,
  inverse = false,
  vertical = false,
}: {
  className?: string;
  inverse?: boolean;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <span
        aria-hidden="true"
        className={cn("block w-px self-stretch", inverse ? "bg-inverse-line" : "bg-line", className)}
      />
    );
  }
  return <hr className={cn(inverse ? "hairline-inverse" : "hairline", className)} />;
}
