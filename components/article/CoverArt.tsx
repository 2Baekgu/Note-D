import Image from "next/image";

import { toneFor } from "@/lib/data/topics";

/* ────────────────────────────────────────────────────────────
   Generative cover art.

   Every article gets a distinct, deterministic composition
   derived from its slug — so the archive looks art-directed
   before a single photograph exists. Give an article a real
   `coverImage` URL and this is skipped entirely.
   ──────────────────────────────────────────────────────────── */

type Palette = { bg: string; a: string; b: string; c: string; ink: string };

const PALETTES: Palette[] = [
  { bg: "#1B2A5E", a: "#3D5BD9", b: "#8FA9FF", c: "#F2E9D8", ink: "#0B1230" }, // UX
  { bg: "#8C3A16", a: "#E2662C", b: "#F2B872", c: "#FCEBD5", ink: "#3A1607" }, // UI
  { bg: "#3F1F52", a: "#7B3EA1", b: "#C58FE0", c: "#F0E2F5", ink: "#1C0A28" }, // Psychology
  { bg: "#1E3D2F", a: "#3C7A57", b: "#8FC79E", c: "#E7F0E3", ink: "#0C1D15" }, // UX Research
  { bg: "#0E3F44", a: "#177A80", b: "#67C7C2", c: "#E0F2EE", ink: "#042226" }, // Interaction
  { bg: "#571C2B", a: "#9E3247", b: "#DD8093", c: "#F7E3E5", ink: "#2A0A13" }, // Cognitive Science
  { bg: "#6B4C10", a: "#C89020", b: "#EFC868", c: "#FAEED2", ink: "#2E1F04" }, // Product
  { bg: "#12275E", a: "#2B4BE0", b: "#7EA0FF", c: "#E6ECFF", ink: "#08132F" }, // Accessibility
  { bg: "#232323", a: "#454545", b: "#B9F241", c: "#EDEDE8", ink: "#0D0D0D" }, // Physical AI
  { bg: "#6E2D12", a: "#C2571F", b: "#EE9B60", c: "#F8E5D3", ink: "#331306" }, // Design Theory
];

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let state = hash(seed) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };
}

export interface CoverArtProps {
  seed: string;
  topic?: string;
  /** 0–9; defaults to the topic tone. */
  tone?: number;
  className?: string;
}

export function CoverArt({ seed, topic, tone, className }: CoverArtProps) {
  const paletteIndex =
    tone ?? (topic ? toneFor(topic) : hash(seed) % PALETTES.length);
  const p = PALETTES[paletteIndex % PALETTES.length];
  const r = rng(seed);
  const variant = Math.floor(r() * 6);
  const uid = `ca${hash(seed).toString(36)}`;

  const W = 800;
  const H = 1000;

  const shapes: React.ReactElement[] = [];

  if (variant === 0) {
    // Concentric arcs radiating from an off-centre origin
    const cx = W * (0.2 + r() * 0.6);
    const cy = H * (0.15 + r() * 0.5);
    for (let i = 10; i >= 0; i--) {
      shapes.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={90 + i * (70 + r() * 30)}
          fill="none"
          stroke={i % 3 === 0 ? p.c : i % 3 === 1 ? p.b : p.a}
          strokeOpacity={0.28 + (10 - i) * 0.05}
          strokeWidth={2 + r() * 16}
        />,
      );
    }
    shapes.push(<circle key="core" cx={cx} cy={cy} r={40 + r() * 50} fill={p.c} />);
  } else if (variant === 1) {
    // Soft overlapping fields
    for (let i = 0; i < 5; i++) {
      shapes.push(
        <ellipse
          key={i}
          cx={W * r()}
          cy={H * r()}
          rx={W * (0.25 + r() * 0.5)}
          ry={H * (0.18 + r() * 0.35)}
          fill={[p.a, p.b, p.c][i % 3]}
          opacity={0.42 + r() * 0.32}
          transform={`rotate(${r() * 90 - 45} ${W / 2} ${H / 2})`}
        />,
      );
    }
  } else if (variant === 2) {
    // Halftone field — dot radius follows a diagonal gradient
    const cols = 11;
    const rows = 14;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const t = (x / cols + y / rows) / 2;
        const rad = 4 + t * 30 * (0.6 + r() * 0.8);
        shapes.push(
          <circle
            key={`${x}-${y}`}
            cx={((x + 0.5) * W) / cols}
            cy={((y + 0.5) * H) / rows}
            r={rad}
            fill={t > 0.62 ? p.c : p.b}
            opacity={0.25 + t * 0.7}
          />,
        );
      }
    }
  } else if (variant === 3) {
    // Offset bands with a displaced block
    let y = 0;
    let i = 0;
    while (y < H) {
      const h = 40 + r() * 130;
      shapes.push(
        <rect
          key={i}
          x={-W * 0.2 + r() * W * 0.25}
          y={y}
          width={W * 1.4}
          height={h}
          fill={[p.a, p.b, p.c, p.bg][i % 4]}
          opacity={0.5 + r() * 0.45}
        />,
      );
      y += h;
      i++;
    }
    shapes.push(
      <rect
        key="block"
        x={W * (0.15 + r() * 0.35)}
        y={H * (0.25 + r() * 0.4)}
        width={W * 0.34}
        height={W * 0.34}
        fill={p.c}
        opacity={0.9}
        transform={`rotate(${r() * 30 - 15} ${W / 2} ${H / 2})`}
      />,
    );
  } else if (variant === 4) {
    // Type-scale columns
    const cols = 5 + Math.floor(r() * 3);
    for (let i = 0; i < cols; i++) {
      const w = W / cols;
      const h = H * (0.25 + r() * 0.7);
      shapes.push(
        <rect
          key={i}
          x={i * w + w * 0.08}
          y={H - h}
          width={w * 0.84}
          height={h}
          fill={[p.a, p.b, p.c][i % 3]}
          opacity={0.55 + r() * 0.4}
          rx={w * 0.42}
        />,
      );
    }
    shapes.push(
      <circle key="sun" cx={W * (0.2 + r() * 0.6)} cy={H * 0.18} r={70 + r() * 60} fill={p.c} opacity={0.92} />,
    );
  } else {
    // Horizon
    const horizon = H * (0.42 + r() * 0.28);
    shapes.push(<rect key="sky" x={0} y={0} width={W} height={horizon} fill={p.a} opacity={0.85} />);
    shapes.push(
      <circle key="orb" cx={W * (0.25 + r() * 0.5)} cy={horizon * (0.45 + r() * 0.3)} r={80 + r() * 90} fill={p.c} opacity={0.95} />,
    );
    shapes.push(<rect key="ground" x={0} y={horizon} width={W} height={H - horizon} fill={p.b} opacity={0.9} />);
    for (let i = 0; i < 4; i++) {
      shapes.push(
        <rect
          key={`ln${i}`}
          x={0}
          y={horizon + (i + 1) * ((H - horizon) / 5)}
          width={W}
          height={2 + r() * 8}
          fill={p.ink}
          opacity={0.18 + r() * 0.2}
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className={`cover-art h-full w-full ${className ?? ""}`}
    >
      <defs>
        <linearGradient id={`${uid}-veil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.ink} stopOpacity="0.05" />
          <stop offset="55%" stopColor={p.ink} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.ink} stopOpacity="0.55" />
        </linearGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y="0" width={W} height={H} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-clip)`}>
        <rect x="0" y="0" width={W} height={H} fill={p.bg} />
        {shapes}
        <rect x="0" y="0" width={W} height={H} fill={`url(#${uid}-veil)`} />
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          filter={`url(#${uid}-grain)`}
          opacity="0.16"
          style={{ mixBlendMode: "overlay" }}
        />
      </g>
    </svg>
  );
}

/** Cover image if present, generative art otherwise.
 *
 *  The covers are full-resolution PNGs — three of them over 1.5MB — and the
 *  home page was sending 6.8MB of them to show thumbnails a few hundred
 *  pixels wide. `next/image` serves each one resized and re-encoded, so
 *  `sizes` has to say how wide it will actually be drawn; guess high and the
 *  saving goes with it.
 *
 *  `priority` for the one cover that is on screen before anyone scrolls.
 *  Everything else stays lazy. */
export function CoverMedia({
  src,
  alt,
  seed,
  topic,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  seed: string;
  topic?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }
  return <CoverArt seed={seed} topic={topic} className={className} />;
}
