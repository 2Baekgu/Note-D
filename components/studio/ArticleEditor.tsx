"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, Reference } from "@/lib/types";
import { topics } from "@/lib/data/topics";
import { members } from "@/lib/data/members";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentBody } from "@/components/content/ContentBody";
import { CoverMedia } from "@/components/article/CoverArt";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { useStuck } from "@/components/ui/useStuck";
import { RichEditor } from "./RichEditor";
import { emptyArticle, persistArticle } from "@/lib/studio";
import { readingTime, toBlocks, toPlainText } from "@/lib/content/doc";
import { cn, formatDate, slugify } from "@/lib/utils";

export function ArticleEditor({ initial }: { initial?: Article }) {
  const { user } = useAuth();
  const router = useRouter();

  const [article, setArticle] = useState<Article>(() => initial ?? emptyArticle(""));
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [actionsRef, actionsStuck] = useStuck<HTMLDivElement>();

  // The session may arrive after the first render, so the author falls back
  // rather than being written into state by an effect. RLS only accepts
  // `auth.uid() = author_id`, so this is never a choice — you publish as you.
  const authorId = article.authorId || user?.id || "";
  const author = useMemo(() => {
    if (user && authorId === user.id) {
      return { name: user.name, profileImage: user.image };
    }
    const known = members.find((m) => m.id === authorId);
    return { name: known?.name ?? "—", profileImage: known?.profileImage ?? null };
  }, [authorId, user]);

  const patch = (values: Partial<Article>) => setArticle((a) => ({ ...a, ...values }));

  // A published article keeps the slug it went out with — changing it would
  // break its URL — so only a new one takes its slug from the title.
  const computedSlug = initial?.slug ? article.slug : slugify(article.title);

  /** Covers come from the article's own pictures — uploading a separate file
   *  only ever produced a cover that appeared nowhere in the piece. */
  const bodyImages = useMemo(() => {
    const seen = new Set<string>();
    for (const block of toBlocks(article.content)) {
      if (block.type === "image" && block.src && !block.src.startsWith("art:")) {
        seen.add(block.src);
      }
    }
    return [...seen];
  }, [article.content]);
  const valid = article.title.trim().length > 1 && article.content.trim().length > 10;

  async function save(status: Article["status"]) {
    if (!valid) {
      setNotice("제목과 본문을 먼저 채워주세요.");
      return;
    }
    setSaving(true);
    setNotice(null);
    if (!authorId) {
      setNotice("로그인이 필요합니다.");
      return;
    }

    const result = await persistArticle({
      ...article,
      authorId,
      slug: computedSlug,
      status,
      // Nothing chosen? Lead with the first picture in the piece.
      coverImage: article.coverImage ?? bodyImages[0] ?? null,
    });
    setSaving(false);

    if (!result.ok) {
      setNotice(result.error ?? "저장에 실패했습니다.");
      return;
    }
    setNotice(
      result.storage === "local"
        ? status === "published"
          ? "발행했습니다 — 데모 모드라 이 브라우저에만 저장됩니다."
          : "초안을 이 브라우저에 저장했습니다."
        : status === "published"
          ? "발행했습니다."
          : "초안을 저장했습니다.",
    );
    patch({ status });
    if (!initial) router.replace("/studio");
  }

  if (!user) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">로그인이 필요합니다</p>
        <p className="t-body mt-3 text-ink-muted">아티클 작성은 스터디 멤버만 가능합니다.</p>
        <ButtonLink href="/login?next=/studio" className="mt-8">
          Sign in →
        </ButtonLink>
      </div>
    );
  }

  return (
    <div>
      {/* Action bar */}
      <div
        ref={actionsRef}
        className={cn(
          "sticky-bar flex flex-wrap items-center gap-3 py-3",
          actionsStuck && "is-stuck",
        )}
      >
        <ButtonLink href="/studio" variant="ghost" size="sm">
          ← Studio
        </ButtonLink>

        <Chip tone={article.status === "published" ? "solid" : "outline"} size="sm">
          {article.status}
        </Chip>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="segmented segmented-sm">
            {(["write", "preview"] as const).map((m) => (
              <ChipButton
                key={m}
                size="sm"
                tone={mode === m ? "solid" : "outline"}
                className={mode === m ? "" : "border-transparent"}
                onClick={() => setMode(m)}
              >
                {m}
              </ChipButton>
            ))}
          </div>

          <Button variant="secondary" size="sm" disabled={saving} onClick={() => save("draft")}>
            Save draft
          </Button>
          <Button
            size="sm"
            disabled={saving || !valid}
            className="bg-accent text-on-accent hover:bg-accent hover:opacity-90"
            onClick={() => save("published")}
          >
            {saving ? "Saving…" : "Publish"}
          </Button>
        </div>
      </div>

      {notice && (
        <p className="surface t-caption mt-4 px-4 py-3 text-ink-muted">{notice}</p>
      )}

      {/* One column. The article column inside RichEditor already holds the
          measure, so the sidebar was only ever squeezing it. */}
      <div className="mt-12">
        <div className="min-w-0">
          {mode === "write" ? (
            <>
              {/* Above the sheet, on the page's own width — the same edges
                  the toolbar and the sheet use, so nothing is inset. */}
              <label htmlFor="title" className="t-label text-ink-faint">
                Title
              </label>
              <input
                id="title"
                value={article.title}
                onChange={(e) => patch({ title: e.target.value })}
                placeholder="무엇에 대해 쓰고 있나요?"
                className="t-h1 serif-heads mt-2 w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
              />

              <label htmlFor="subtitle" className="t-label mt-8 block text-ink-faint">
                Subtitle
              </label>
              <textarea
                id="subtitle"
                value={article.subtitle}
                onChange={(e) => patch({ subtitle: e.target.value })}
                rows={2}
                placeholder="한두 문장으로 이 글을 요약해주세요."
                className="field mt-2 w-full resize-y"
              />

              <div className="mt-10">
                <RichEditor
                  value={article.content}
                  onChange={(content) => patch({ content })}
                  meta={`${toPlainText(article.content).length.toLocaleString()}자 · 약 ${readingTime(article.content)}분`}
                />
              </div>

              <p className="t-label mt-16 text-ink-faint">References</p>
              <div className="mt-3 space-y-3">
                {article.references.map((ref, i) => (
                  <div
                    key={i}
                    className="surface grid gap-2 p-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
                  >
                    <input
                      value={ref.label}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, label: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="자료 제목"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 제목`}
                    />
                    <input
                      value={ref.source ?? ""}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, source: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="출처"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 출처`}
                    />
                    <input
                      value={ref.url ?? ""}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, url: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="https://"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 링크`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch({ references: article.references.filter((_, j) => j !== i) })
                      }
                      className="t-label px-3 text-ink-faint transition-colors duration-[var(--duration-base)] hover:text-accent"
                      aria-label={`참고자료 ${i + 1} 삭제`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <ChipButton
                  tone="outline"
                  className="border-dashed"
                  onClick={() =>
                    patch({
                      references: [
                        ...article.references,
                        { label: "", source: "", url: "" } as Reference,
                      ],
                    })
                  }
                >
                  + Add reference
                </ChipButton>
              </div>

              {/* ── Article details ─────────────────────────
                  Below the writing, not beside it — none of this needs to be
                  in view while you are actually writing. */}
              <section className="mt-16 border-t border-line pt-10">
                <p className="t-label text-ink-faint">Article details</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="Author">
                    <div className="flex items-center gap-3">
                      <Avatar name={author.name} src={author.profileImage} size="md" />
                      <div className="min-w-0">
                        <p className="t-body truncate">{author.name}</p>
                        <p className="t-caption text-ink-faint">본인 명의로만 발행됩니다.</p>
                      </div>
                    </div>
                  </Field>

                  <Field label="Published date">
                    <input
                      type="date"
                      value={article.publishedAt}
                      onChange={(e) => patch({ publishedAt: e.target.value })}
                      className="field"
                      aria-label="발행일"
                    />
                  </Field>
                </div>

                <div className="mt-8">
                  <Field label="Topics">
                    {/* Pick as many as apply — the first one picked leads the card. */}
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => {
                        const on = article.topics.includes(t.name);
                        return (
                          <ChipButton
                            key={t.slug}
                            tone={on ? "solid" : "outline"}
                            size="sm"
                            aria-pressed={on}
                            onClick={() =>
                              patch({
                                topics: on
                                  ? article.topics.filter((x) => x !== t.name)
                                  : [...article.topics, t.name],
                              })
                            }
                          >
                            {t.name}
                          </ChipButton>
                        );
                      })}
                    </div>
                    <p className="t-caption mt-3 text-ink-faint">
                      {article.topics.length > 0
                        ? article.topics.join(" · ")
                        : "하나 이상 선택해 주세요."}
                    </p>
                  </Field>
                </div>

                <div className="mt-8">
                  <Field label="Cover image">
                    <CoverPicker
                      images={bodyImages}
                      value={article.coverImage}
                      onPick={(src) => patch({ coverImage: src })}
                    />
                  </Field>
                </div>
              </section>
            </>
          ) : (
            <Preview article={{ ...article, slug: computedSlug }} authorName={author.name} />
          )}
        </div>

      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="t-label mb-3 text-ink-faint">{label}</p>
      {children}
    </div>
  );
}

function Preview({ article, authorName }: { article: Article; authorName: string }) {
  return (
    /* `serif-heads` is what the real article page puts around this — without
       it the preview showed sans headings the published page never uses. */
    <div className="surface serif-heads p-6 sm:p-12">
      <p className="t-label mb-8 text-ink-faint">Preview</p>

      <div className="flex flex-wrap items-center gap-3">
        {article.topics.map((t, i) => (
          <Chip key={t} tone={i === 0 ? "solid" : "outline"} size="sm">
            {t}
          </Chip>
        ))}
        <span className="t-caption text-ink-muted">{formatDate(article.publishedAt)}</span>
      </div>

      <h1 className="t-h1 mt-6 text-balance">{article.title || "제목 없음"}</h1>
      {article.subtitle && (
        <p className="t-body-lg mt-6 max-w-[50ch] text-ink-muted">{article.subtitle}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3">
        <span className="t-body">{authorName}</span>
        <span className="t-caption text-ink-faint">
          읽는 데 약 {readingTime(article.content)}분
        </span>
      </div>

      <div className="media mt-8 aspect-[21/9]">
        <CoverMedia
          src={article.coverImage}
          alt=""
          seed={article.slug || "preview"}
          topic={article.topics[0]}
        />
      </div>

      <div className="mt-12">
        {article.content.trim() ? (
          <ContentBody content={article.content} seed={article.slug || "preview"} />
        ) : (
          <p className="t-body py-16 text-center text-ink-faint">
            본문을 입력하면 여기에 미리보기가 나타납니다.
          </p>
        )}
      </div>
    </div>
  );
}

/** Pick the cover from the pictures already in the article. */
function CoverPicker({
  images,
  value,
  onPick,
}: {
  images: string[];
  value: string | null;
  onPick: (src: string | null) => void;
}) {
  // An article imported with its own cover has one that appears nowhere in
  // the body; keep it on offer so the current choice is always visible.
  const options = value && !images.includes(value) ? [value, ...images] : images;

  if (!options.length) {
    return (
      <p className="t-caption text-ink-muted">
        본문에 이미지를 넣으면 그중에서 커버를 고를 수 있습니다. 없으면 주제를 시드로 한
        커버 아트가 대신 그려집니다.
      </p>
    );
  }

  const active = value ?? options[0];

  return (
    <>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {options.map((src) => {
          const on = src === active;
          return (
            <li key={src}>
              <button
                type="button"
                onClick={() => onPick(src)}
                aria-pressed={on}
                className={cn(
                  "media block w-full overflow-hidden rounded-md transition-all duration-[var(--duration-base)]",
                  "aspect-[4/3] ring-offset-2",
                  on ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
          );
        })}
      </ul>
      <p className="t-caption mt-3 text-ink-faint">
        {value
          ? "카드와 목록에 이 이미지가 쓰입니다."
          : "고르지 않으면 첫 번째 이미지가 커버가 됩니다."}
      </p>
    </>
  );
}
