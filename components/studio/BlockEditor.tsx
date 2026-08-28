"use client";

import { useRef, useState } from "react";
import type { Block } from "@/lib/content/parse";
import { parseContent, youtubeId } from "@/lib/content/parse";
import { serializeBlocks } from "@/lib/content/serialize";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { uploadImage } from "@/lib/studio";
import { cn } from "@/lib/utils";

/* A block editor over the same dialect the articles are stored in. You see a
   heading as a heading and an image as an image; nothing shows you a path.
   Each block is a plain input rather than one contenteditable surface, which
   is what keeps Korean IME composition from breaking mid-syllable. */

type Row = { id: string; block: Block };

let seq = 0;
const newId = () => `b${(seq += 1)}-${Date.now().toString(36)}`;
const toRows = (blocks: Block[]): Row[] => blocks.map((block) => ({ id: newId(), block }));

const EMPTY: Block = { type: "paragraph", text: "" };

/** What the type switcher offers, in the order it reads. */
const TYPES: { label: string; make: (text: string) => Block; is: (b: Block) => boolean }[] = [
  { label: "본문", make: (t) => ({ type: "paragraph", text: t }), is: (b) => b.type === "paragraph" },
  { label: "제목", make: (t) => ({ type: "heading", level: 2, text: t }), is: (b) => b.type === "heading" && b.level === 2 },
  { label: "소제목", make: (t) => ({ type: "heading", level: 3, text: t }), is: (b) => b.type === "heading" && b.level === 3 },
  { label: "인용", make: (t) => ({ type: "quote", text: t }), is: (b) => b.type === "quote" },
  { label: "강조", make: (t) => ({ type: "highlight", text: t }), is: (b) => b.type === "highlight" },
  { label: "목록", make: (t) => ({ type: "list", ordered: false, items: t ? [t] : [""] }), is: (b) => b.type === "list" && !b.ordered },
  { label: "번호", make: (t) => ({ type: "list", ordered: true, items: t ? [t] : [""] }), is: (b) => b.type === "list" && b.ordered },
];

/** The text a block carries, so switching type keeps what you wrote. */
function textOf(b: Block): string {
  switch (b.type) {
    case "heading":
    case "paragraph":
    case "quote":
    case "highlight":
      return b.text;
    case "list":
      return b.items.join(" ");
    default:
      return "";
  }
}

function grow(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

export function BlockEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const { mode } = useAuth();
  // The editor owns the blocks; the parent keeps the serialized text. Re-parsing
  // on every keystroke would throw away the caret, so `value` seeds it once.
  const [rows, setRows] = useState<Row[]>(() => {
    const parsed = parseContent(value);
    return toRows(parsed.length ? parsed : [EMPTY]);
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  function commit(next: Row[]) {
    const rowsOrEmpty = next.length ? next : [{ id: newId(), block: EMPTY }];
    setRows(rowsOrEmpty);
    onChange(serializeBlocks(rowsOrEmpty.map((r) => r.block)));
  }

  const focusSoon = (id: string) =>
    window.setTimeout(() => {
      const el = document.getElementById(`blk-${id}`) as HTMLTextAreaElement | null;
      el?.focus();
      grow(el);
    }, 0);

  function update(id: string, block: Block) {
    commit(rows.map((r) => (r.id === id ? { ...r, block } : r)));
  }

  function removeAt(id: string) {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    commit(next);
    const prev = next[Math.max(0, i - 1)];
    if (prev) focusSoon(prev.id);
  }

  /** Insert after `afterId`, or at the end when there is no focused block. */
  function insert(blocks: Block[], afterId = activeId) {
    const added = toRows(blocks);
    const i = afterId ? rows.findIndex((r) => r.id === afterId) : -1;
    const at = i >= 0 ? i + 1 : rows.length;
    const next = [...rows.slice(0, at), ...added, ...rows.slice(at)];
    commit(next);
    focusSoon(added[added.length - 1].id);
    return added;
  }

  function move(id: string, by: -1 | 1) {
    const i = rows.findIndex((r) => r.id === id);
    const j = i + by;
    if (i < 0 || j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  }

  /** Drop, paste and the picker all land here. */
  function addImages(list: FileList | File[] | null, afterId = activeId) {
    const files = Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    setError(null);
    setUploading((n) => n + files.length);

    // Each file gets its own placeholder block, replaced by id when its
    // upload lands — so they can finish in any order.
    const placed = insert(
      files.map((f) => ({ type: "image", src: "", alt: f.name.replace(/\.[^.]+$/, "") }) as Block),
      afterId,
    );

    files.forEach(async (file, i) => {
      const id = placed[i].id;
      const res = await uploadImage(file, "body");
      setUploading((n) => n - 1);

      setRows((current) => {
        const next = res.url
          ? current.map((r) =>
              r.id === id && r.block.type === "image"
                ? { ...r, block: { ...r.block, src: res.url as string } }
                : r,
            )
          : current.filter((r) => r.id !== id);
        onChange(serializeBlocks(next.map((r) => r.block)));
        return next;
      });

      if (!res.url) setError(res.error ?? "업로드에 실패했습니다.");
    });
  }

  if (source) {
    return (
      <div>
        <Bar onToggleSource={() => setSource(false)} sourceOn />
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setRows(toRows(parseContent(e.target.value)));
          }}
          rows={26}
          spellCheck={false}
          className="field mt-3 min-h-[32rem] w-full resize-y leading-[1.8]"
        />
        <p className="t-caption mt-2 text-ink-faint">
          문법을 직접 다루는 모드입니다. 블록 편집으로 돌아가면 그대로 반영됩니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Bar
        onToggleSource={() => setSource(true)}
        onInsert={(b) => insert([b])}
        onPickImage={() => fileRef.current?.click()}
        uploading={uploading}
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          addImages(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        className={cn(
          "surface relative mt-3 min-h-[28rem] px-4 py-6 sm:px-8",
          dragging && "border-accent",
        )}
        onDragEnter={(e) => {
          if (!e.dataTransfer.types.includes("Files")) return;
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes("Files")) e.preventDefault();
        }}
        onDragLeave={() => {
          dragDepth.current -= 1;
          if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setDragging(false);
          }
        }}
        onDrop={(e) => {
          if (!e.dataTransfer.files.length) return;
          e.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          addImages(e.dataTransfer.files);
        }}
      >
        {rows.map((row) => (
          <BlockRow
            key={row.id}
            row={row}
            active={activeId === row.id}
            onFocus={() => setActiveId(row.id)}
            onChange={(b) => update(row.id, b)}
            onRemove={() => removeAt(row.id)}
            onMove={(by) => move(row.id, by)}
            onEnter={() => insert([{ type: "paragraph", text: "" }], row.id)}
            onPasteFiles={(files) => addImages(files, row.id)}
          />
        ))}

        <button
          type="button"
          onClick={() => insert([{ type: "paragraph", text: "" }], rows[rows.length - 1]?.id)}
          className="t-caption mt-4 w-full rounded-md border border-dashed border-line py-3 text-ink-faint transition-colors duration-[var(--duration-base)] hover:border-ink hover:text-ink"
        >
          + 여기에 이어 쓰기
        </button>

        {dragging && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-[rgba(255,255,255,0.88)]"
            aria-hidden="true"
          >
            <p className="t-h3 text-accent">놓으면 이 위치에 이미지가 들어갑니다</p>
          </div>
        )}
      </div>

      <p className="t-caption mt-2 text-ink-faint">
        이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣을 수 있습니다. 블록을 클릭하면 위에 종류를
        바꾸는 버튼이 나옵니다.
        {mode === "demo" && " 데모 모드에서는 이미지가 글 안에 직접 담겨 용량이 커집니다."}
      </p>

      {error && <p className="t-caption mt-2 text-accent">{error}</p>}
    </div>
  );
}

/* ── Toolbar ──────────────────────────────────────────────── */

function Bar({
  onInsert,
  onPickImage,
  onToggleSource,
  uploading = 0,
  sourceOn = false,
}: {
  onInsert?: (b: Block) => void;
  onPickImage?: () => void;
  onToggleSource: () => void;
  uploading?: number;
  sourceOn?: boolean;
}) {
  return (
    <div className="scroll-x flex items-center gap-1.5 pb-1">
      {!sourceOn && onInsert && (
        <>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "heading", level: 2, text: "" })}>
            제목
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "heading", level: 3, text: "" })}>
            소제목
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "quote", text: "" })}>
            인용
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "list", ordered: false, items: [""] })}>
            목록
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "highlight", text: "" })}>
            강조
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "divider" })}>
            구분선
          </ChipButton>
          <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
          <ChipButton size="sm" tone="outline" onClick={onPickImage}>
            + 이미지
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onInsert({ type: "embed", url: "", provider: "youtube" })}>
            영상
          </ChipButton>
        </>
      )}

      {uploading > 0 && (
        <span className="t-caption ml-1 shrink-0 text-ink-faint">
          이미지 {uploading}개 올리는 중…
        </span>
      )}

      <button
        type="button"
        onClick={onToggleSource}
        className="t-label ml-auto shrink-0 px-2 text-ink-faint underline underline-offset-4"
      >
        {sourceOn ? "블록으로 편집" : "문법으로 편집"}
      </button>
    </div>
  );
}

/* ── One block ────────────────────────────────────────────── */

function BlockRow({
  row,
  active,
  onFocus,
  onChange,
  onRemove,
  onMove,
  onEnter,
  onPasteFiles,
}: {
  row: Row;
  active: boolean;
  onFocus: () => void;
  onChange: (b: Block) => void;
  onRemove: () => void;
  onMove: (by: -1 | 1) => void;
  onEnter: () => void;
  onPasteFiles: (files: File[]) => void;
}) {
  const { block, id } = row;

  const handlePaste = (e: React.ClipboardEvent) => {
    const files = Array.from(e.clipboardData.files).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    e.preventDefault();
    onPasteFiles(files);
  };

  /** Enter makes the next block; Backspace on an empty one removes it. */
  const keys = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && block.type !== "quote") {
      e.preventDefault();
      onEnter();
    }
    if (e.key === "Backspace" && !textOf(block) && e.currentTarget.selectionStart === 0) {
      e.preventDefault();
      onRemove();
    }
  };

  const shared = {
    id: `blk-${id}`,
    onFocus,
    onPaste: handlePaste,
    onKeyDown: keys,
    ref: grow,
    rows: 1,
    spellCheck: false,
    className:
      "w-full resize-none border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint",
  };

  return (
    <div className="group relative -mx-2 rounded-md px-2 py-1.5 transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.02)]">
      {/* Floats above the block rather than sitting in the flow, so clicking
          into a paragraph does not shove the text you are reading downwards. */}
      {active && (
        <div className="surface absolute bottom-full left-0 z-20 mb-1 flex max-w-full items-center gap-1 overflow-x-auto px-1.5 py-1 shadow-float">
          {TYPES.map((t) => (
            <ChipButton
              key={t.label}
              size="sm"
              tone={t.is(block) ? "solid" : "ghost"}
              onClick={() => onChange(t.make(textOf(block)))}
            >
              {t.label}
            </ChipButton>
          ))}
          <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
          <ChipButton size="sm" tone="ghost" onClick={() => onMove(-1)} title="위로">
            ↑
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onMove(1)} title="아래로">
            ↓
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={onRemove} title="블록 삭제">
            삭제
          </ChipButton>
        </div>
      )}

      {block.type === "paragraph" && (
        <textarea
          {...shared}
          value={block.text}
          placeholder="여기에 본문을 씁니다. 이미지는 끌어다 놓으세요."
          onChange={(e) => {
            grow(e.currentTarget);
            onChange({ ...block, text: e.target.value });
          }}
          className={cn(shared.className, "t-body-lg leading-[1.9]")}
        />
      )}

      {block.type === "heading" && (
        <textarea
          {...shared}
          value={block.text}
          placeholder={block.level === 2 ? "제목" : "소제목"}
          onChange={(e) => {
            grow(e.currentTarget);
            onChange({ ...block, text: e.target.value });
          }}
          className={cn(
            shared.className,
            "serif-heads font-semibold",
            block.level === 2 ? "t-h1" : "t-h2",
          )}
        />
      )}

      {block.type === "highlight" && (
        <div className="rounded-md bg-accent-soft px-4 py-3">
          <textarea
            {...shared}
            value={block.text}
            placeholder="강조하고 싶은 한 문장"
            onChange={(e) => {
              grow(e.currentTarget);
              onChange({ ...block, text: e.target.value });
            }}
            className={cn(shared.className, "t-body-lg")}
          />
        </div>
      )}

      {block.type === "quote" && (
        <div className="border-l-2 border-ink pl-4">
          <textarea
            {...shared}
            value={block.text}
            placeholder="인용할 문장"
            onChange={(e) => {
              grow(e.currentTarget);
              onChange({ ...block, text: e.target.value });
            }}
            className={cn(shared.className, "t-body-lg italic")}
          />
          <input
            value={block.attribution ?? ""}
            onChange={(e) => onChange({ ...block, attribution: e.target.value })}
            onFocus={onFocus}
            placeholder="— 출처 (선택)"
            className="t-caption mt-2 w-full border-0 bg-transparent p-0 text-ink-muted outline-none placeholder:text-ink-faint"
          />
        </div>
      )}

      {block.type === "list" && (
        <ul className="space-y-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="t-caption shrink-0 text-ink-faint">
                {block.ordered ? `${i + 1}.` : "•"}
              </span>
              <input
                id={i === 0 ? `blk-${id}` : undefined}
                value={item}
                onFocus={onFocus}
                onPaste={handlePaste}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = e.target.value;
                  onChange({ ...block, items });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const items = [...block.items];
                    items.splice(i + 1, 0, "");
                    onChange({ ...block, items });
                  }
                  if (e.key === "Backspace" && !item && block.items.length > 1) {
                    e.preventDefault();
                    onChange({ ...block, items: block.items.filter((_, j) => j !== i) });
                  }
                }}
                placeholder="항목"
                className="t-body-lg w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
              />
            </li>
          ))}
        </ul>
      )}

      {block.type === "image" && (
        <figure onFocus={onFocus}>
          {block.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={block.src}
              alt={block.alt}
              className="block h-auto w-full rounded-md"
            />
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center rounded-md border border-dashed border-line">
              <span className="t-caption text-ink-faint">올리는 중…</span>
            </div>
          )}
          <figcaption className="mt-2">
            <input
              id={`blk-${id}`}
              value={block.caption ?? ""}
              onFocus={onFocus}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
              placeholder="사진 설명 (선택)"
              className="t-caption w-full border-0 bg-transparent p-0 text-center text-ink-muted outline-none placeholder:text-ink-faint"
            />
          </figcaption>
        </figure>
      )}

      {block.type === "embed" && (
        <div className="rounded-md border border-line px-4 py-3">
          <p className="t-label text-ink-faint">
            {youtubeId(block.url) ? "YouTube" : "임베드"}
          </p>
          <input
            id={`blk-${id}`}
            value={block.url}
            onFocus={onFocus}
            onChange={(e) =>
              onChange({
                ...block,
                url: e.target.value,
                provider: youtubeId(e.target.value) ? "youtube" : "iframe",
              })
            }
            placeholder="https://www.youtube.com/watch?v=…"
            className="t-body mt-2 w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
          />
        </div>
      )}

      {block.type === "divider" && (
        <div className="py-4" id={`blk-${id}`} tabIndex={-1} onFocus={onFocus}>
          <hr className="border-line" />
        </div>
      )}
    </div>
  );
}
