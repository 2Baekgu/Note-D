import type { ArticleListItem } from "@/lib/types";
import { ArticleCard, type CardRatio } from "./ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* CSS multi-column staggers nicely but leaves the columns ending at different
   heights, because it cannot split a card. So the columns are built here
   instead: every column is handed the same set of proportions in a rotated
   order, which staggers the cards while making the column totals identical. */

const COLUMNS = 4;

/** Card height as a multiple of the column width. */
const HEIGHT: Record<CardRatio, number> = {
  tall: 4.6 / 3,
  portrait: 5 / 4,
  square: 1,
  wide: 3.4 / 4,
};

const CYCLE: CardRatio[] = [
  "tall",
  "portrait",
  "square",
  "wide",
  "portrait",
  "tall",
  "wide",
  "square",
];

interface Cell {
  article: ArticleListItem;
  aspect: number;
  /** Position in date order, used to keep narrower layouts chronological. */
  order: number;
}

function buildColumns(articles: ArticleListItem[]): Cell[][] {
  /* Dealt across the columns, so the top row holds the four newest and the
     set reads the way people actually read it: left to right, then down. */
  const columns: ArticleListItem[][] = Array.from({ length: COLUMNS }, () => []);
  articles.forEach((a, i) => columns[i % COLUMNS].push(a));

  const depth = Math.max(...columns.map((c) => c.length));
  const heights = columns.map((col, c) =>
    col.map((_, j) => HEIGHT[CYCLE[(j + c) % depth % CYCLE.length]]),
  );

  // Columns holding one card fewer end short; stretch their last card to close
  // the gap so every column bottoms out on the same line.
  const totals = heights.map((h) => h.reduce((sum, x) => sum + x, 0));
  const target = Math.max(...totals);
  heights.forEach((h, c) => {
    if (h.length && totals[c] < target) h[h.length - 1] += target - totals[c];
  });

  return columns.map((col, c) =>
    col.map((article, j) => ({
      article,
      aspect: 1 / heights[c][j],
      order: j * COLUMNS + c,
    })),
  );
}

export function ArticleMasonry({
  articles,
  className,
}: {
  articles: ArticleListItem[];
  className?: string;
}) {
  if (!articles.length) return null;

  const columns = buildColumns(articles);

  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {columns.map((cells, c) => (
        /* Below four columns the wrappers dissolve and `order` puts the cards
           back into date order, so one- and two-column views stay newest
           first. */
        <div key={c} className="contents lg:flex lg:flex-col lg:gap-6">
          {cells.map((cell, j) => (
            <Reveal
              key={cell.article.id}
              delay={(j % 3) * 60}
              style={{ order: cell.order }}
            >
              <ArticleCard article={cell.article} aspect={cell.aspect} />
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
