import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "solid" | "outline" | "ghost" | "accent" | "onMedia";
type Size = "md" | "sm";

const TONE: Record<Tone, string> = {
  solid: "chip-solid",
  outline: "chip-outline",
  ghost: "chip-ghost",
  accent: "chip-accent",
  onMedia: "chip-on-media",
};

interface ChipProps {
  tone?: Tone;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Trailing count, rendered dimmed. */
  count?: number;
}

function classes(tone: Tone, size: Size, className?: string) {
  return cn("chip", TONE[tone], size === "sm" && "chip-sm", className);
}

function Body({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <>
      {children}
      {typeof count === "number" && <span className="opacity-55">{count}</span>}
    </>
  );
}

/** Static pill — the only label shape in the system. */
export function Chip({ tone = "outline", size = "md", className, children, count }: ChipProps) {
  return (
    <span className={classes(tone, size, className)}>
      <Body count={count}>{children}</Body>
    </span>
  );
}

export function ChipLink({
  href,
  tone = "outline",
  size = "md",
  className,
  children,
  count,
}: ChipProps & { href: string }) {
  return (
    <Link href={href} className={classes(tone, size, className)}>
      <Body count={count}>{children}</Body>
    </Link>
  );
}

export function ChipButton({
  tone = "outline",
  size = "md",
  className,
  children,
  count,
  ...rest
}: ChipProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={classes(tone, size, className)} {...rest}>
      <Body count={count}>{children}</Body>
    </button>
  );
}
