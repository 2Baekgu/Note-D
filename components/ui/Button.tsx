import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onInverse" | "outlineInverse";
type Size = "md" | "sm";

const VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  onInverse: "btn-on-inverse",
  outlineInverse: "btn-outline-inverse",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

/** The one button shape in the system: pill, uppercase label, 44/36px tall. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("btn", VARIANT[variant], size === "sm" && "btn-sm", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: BaseProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn("btn", VARIANT[variant], size === "sm" && "btn-sm", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Arrow that nudges on hover. Pair with `group` on the button. */
export function ArrowGlyph() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform duration-[var(--duration-base)] ease-out-quint group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}
