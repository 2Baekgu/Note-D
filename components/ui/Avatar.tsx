import { cn } from "@/lib/utils";

/** Five sizes, nothing in between. */
const SIZE = { xs: 20, sm: 24, md: 32, lg: 48, xl: 64 } as const;
export type AvatarSize = keyof typeof SIZE;

/* Identicon tints. Not part of the UI palette — these only ever appear
   inside an avatar, never as surface or text colour. */
const TINTS = [
  ["#1B2A5E", "#8FA9FF"],
  ["#8C3A16", "#F2B872"],
  ["#3F1F52", "#C58FE0"],
  ["#1E3D2F", "#8FC79E"],
  ["#0E3F44", "#67C7C2"],
  ["#571C2B", "#DD8093"],
  ["#6B4C10", "#EFC868"],
];

function tintFor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TINTS[h % TINTS.length];
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
}) {
  const px = SIZE[size];
  const [bg, fg] = tintFor(name);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-pill",
        className,
      )}
      style={{ width: px, height: px, background: bg }}
      aria-hidden="true"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span
          style={{ color: fg, fontSize: px * 0.42 }}
          className="font-semibold leading-none"
        >
          {initial}
        </span>
      )}
    </span>
  );
}
