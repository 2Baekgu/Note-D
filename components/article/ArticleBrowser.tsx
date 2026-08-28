"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ArticleWithAuthor, Topic } from "@/lib/types";
import { ArticleMasonry } from "./ArticleMasonry";
import { ArticleRow } from "./ArticleCard";
import { ChipButton } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { useStuck } from "@/components/ui/useStuck";
import { toPlainText } from "@/lib/content/doc";
import { topicSlug, cn } from "@/lib/utils";

type Sort = "newest" | "oldest";
type View = "grid" | "list";

export function ArticleBrowser({
  articles,
  topics,
}: {
  articles: ArticleWithAuthor[];
  topics: Topic[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [topic, setTopic] = useState(params.get("topic") ?? "");
  const [sort, setSort] = useState<Sort>((params.get("sort") as Sort) ?? "newest");
  const [view, setView] = useState<View>("grid");
  const [toolbarRef, toolbarStuck] = useStuck<HTMLDivElement>();

  // Search index — built once, reused for every keystroke.
  const index = useMemo(
    () =>
      new Map(
        articles.map((a) => [
          a.id,
          [a.title, a.subtitle, a.topics.join(" "), a.author.name, toPlainText(a.content)]
            .join(" ")
            .toLowerCase(),
        ]),
      ),
    [articles],
  );

  // An article carries several topics, so it counts once under each of them.
  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((a) =>
      a.topics.forEach((t) => {
        const key = topicSlug(t);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }),
    );
    return counts;
  }, [articles]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = articles.filter((a) => {
      if (topic && !a.topics.some((t) => topicSlug(t) === topic)) return false;
      if (q && !(index.get(a.id) ?? "").includes(q)) return false;
      return true;
    });
    return filtered.sort((a, b) =>
      sort === "oldest"
        ? a.publishedAt.localeCompare(b.publishedAt)
        : b.publishedAt.localeCompare(a.publishedAt),
    );
  }, [articles, topic, query, sort, index]);

  /** Keep the URL shareable without re-rendering the server tree. */
  function sync(next: Partial<{ q: string; topic: string; sort: string }>) {
    const sp = new URLSearchParams();
    const state = { q: query, topic, sort, ...next };
    if (state.q) sp.set("q", state.q);
    if (state.topic) sp.set("topic", state.topic);
    if (state.sort && state.sort !== "newest") sp.set("sort", state.sort);
    const qs = sp.toString();
    router.replace(qs ? `/articles?${qs}` : "/articles", { scroll: false });
  }

  const hasFilters = Boolean(query || topic);

  function reset() {
    setQuery("");
    setTopic("");
    router.replace("/articles", { scroll: false });
  }

  return (
    <>
      {/* ── Toolbar ─────────────────────────────────── */}
      <div
        ref={toolbarRef}
        className={cn("sticky-bar py-4", toolbarStuck && "is-stuck")}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
              aria-hidden="true"
            >
              ⌕
            </span>
            <label htmlFor="search" className="sr-only">
              아티클 검색
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                sync({ q: e.target.value });
              }}
              placeholder="제목, 본문, 토픽, 작성자로 검색"
              className="field rounded-pill pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="segmented">
              {(["newest", "oldest"] as const).map((s) => (
                <ChipButton
                  key={s}
                  tone={sort === s ? "solid" : "outline"}
                  className={sort === s ? "" : "border-transparent"}
                  onClick={() => {
                    setSort(s);
                    sync({ sort: s });
                  }}
                >
                  {s === "newest" ? "Newest" : "Oldest"}
                </ChipButton>
              ))}
            </div>

            <div className="segmented hidden sm:inline-flex">
              {(["grid", "list"] as const).map((v) => (
                <ChipButton
                  key={v}
                  tone={view === v ? "solid" : "outline"}
                  className={view === v ? "" : "border-transparent"}
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                >
                  {v === "grid" ? "Grid" : "List"}
                </ChipButton>
              ))}
            </div>
          </div>
        </div>

        {/* Topics — overlapping, so the counts add up to more than the total */}
        <div className="scroll-x mt-4 flex gap-2 pb-1 lg:flex-wrap lg:overflow-visible">
          <ChipButton
            tone={topic ? "outline" : "solid"}
            count={articles.length}
            onClick={() => {
              setTopic("");
              sync({ topic: "" });
            }}
          >
            All
          </ChipButton>

          {topics.map((t) => {
            const count = topicCounts.get(t.slug) ?? 0;
            const active = topic === t.slug;
            return (
              <ChipButton
                key={t.slug}
                tone={active ? "solid" : "outline"}
                disabled={count === 0}
                count={count > 0 ? count : undefined}
                onClick={() => {
                  const next = active ? "" : t.slug;
                  setTopic(next);
                  sync({ topic: next });
                }}
              >
                {t.name}
              </ChipButton>
            );
          })}
        </div>
      </div>

      {/* ── Result meta ─────────────────────────────── */}
      <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <p className="t-caption text-ink-muted">
          {String(results.length).padStart(2, "0")} / {String(articles.length).padStart(2, "0")}{" "}
          articles
          {topic && ` · ${topics.find((t) => t.slug === topic)?.name}`}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="t-label link-underline text-accent">
            Clear filters ×
          </button>
        )}
      </div>

      {/* ── Results ─────────────────────────────────── */}
      <div className="mt-8">
        {results.length === 0 ? (
          <div className="surface-dashed px-6 py-24 text-center">
            <p className="t-h2">아무것도 찾지 못했습니다</p>
            <p className="t-body mt-3 text-ink-muted">
              다른 키워드로 검색하거나 필터를 지워보세요.
            </p>
            <Button variant="secondary" className="mt-8" onClick={reset}>
              Clear filters
            </Button>
          </div>
        ) : view === "grid" ? (
          <ArticleMasonry articles={results} />
        ) : (
          <div className={cn("border-t border-line")}>
            {results.map((a, i) => (
              <ArticleRow key={a.id} article={a} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
