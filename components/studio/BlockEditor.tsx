"use client";

import { useRef, useState } from "react";
import type { Block } from "@/lib/content/parse";
import { parseContent, youtubeId } from "@/lib/content/parse";
import { serializeBlocks } from "@/lib/content/serialize";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { RichText, caretOffset, setText } from "./RichText";
import { uploadImage } from "@/lib/studio";
import { cn } from "@/lib/utils";

/* One writing surface, not a stack of form fields. A heading looks like a
   heading while you type it, `## ` turns into one and disappears, `/` opens
   the block menu, and selecting text floats the formatting bar. Underneath it
   is still the dialect the 32 articles are stored in — serializeBlocks is the
   inverse of parseContent, and scripts/check-roundtrip.mjs proves it. */

type Row = { id: string; block: Block };

let seq = 0;
const newId = () => `b${(seq += 1)}-${Date.now().toString(36)}`;
const toRows = (blocks: Block[]): Row[] => blocks.map((block) => ({ id: newId(), block }));

const EMPTY: Block = { type: "paragraph", text: "" };

/** Typing these at the head of a paragraph converts it, the way Notion does. */
const SHORTCUTS: [RegExp, (rest: string) => Block][] = [
  [/^###\s/, (t) => ({ type: "heading", level: 3, text: t })],
  [/^##\s/, (t) => ({ type: "heading", level: 2, text: t })],
  [/^>\s/, (t) => ({ type: "quote", text: t })],
  [/^!!\s/, (t) => ({ type: "highlight", text: t })],
  [/^[-*]\s/, (t) => ({ type: "list", ordered: false, items: [t] })],
  [/^\d+[.)]\s/, (t) => ({ type: "list", ordered: true, items: [t] })],
];

/** The menu behind `/` and behind the block handle. */
const MENU: { label: string; hint: string; make: (t: string) => Block }[] = [
  { label: "본문", hint: "그냥 글", make: (t) => ({ type: "paragraph", text: t }) },
  { label: "제목", hint: "## ", make: (t) => ({ type: "heading", level: 2, text: t }) },
  { label: "소제목", hint: "### ", make: (t) => ({ type: "heading", level: 3, text: t }) },
  { label: "인용", hint: "> ", make: (t) => ({ type: "quote", text: t }) },
  { label: "강조 박스", hint: "!! ", make: (t) => ({ type: "highlight", text: t }) },
  { label: "목록", hint: "- ", make: (t) => ({ type: "list", ordered: false, items: [t] }) },
  { label: "번호 목록", hint: "1. ", make: (t) => ({ type: "list", ordered: true, items: [t] }) },
  { label: "구분선", hint: "---", make: () => ({ type: "divider" }) },
  { label: "영상", hint: "YouTube", make: () => ({ type: "embed", url: "", provider: "youtube" }) },
];

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

function withText(b: Block, text: string): Block {
  switch (b.type) {
    case "heading":
    case "paragraph":
    case "quote":
    case "highlight":
      return { ...b, text };
    default:
      return b;
  }
}

const isTextBlock = (b: Block) =>
  b.type === "paragraph" || b.type === "heading" || b.type === "quote" || b.type === "highlight";

export function BlockEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const { mode } = useAuth();
  const [rows, setRows] = useState<Row[]>(() => {
    const parsed = parseContent(value);
    return toRows(parsed.length ? parsed : [EMPTY]);
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [format, setFormat] = useState<{ top: number; left: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragDepth = useRef(0);

  function commit(next: Row[]) {
    const safe = next.length ? next : [{ id: newId(), block: EMPTY }];
    setRows(safe);
    onChange(serializeBlocks(safe.map((r) => r.block)));
  }

  const focusSoon = (id: string) =>
    window.setTimeout(() => {
      const el = document.getElementById(`blk-${id}`);
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }, 0);

  const update = (id: string, block: Block) =>
    commit(rows.map((r) => (r.id === id ? { ...r, block } : r)));

  function removeAt(id: string) {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    commit(next);
    const prev = next[Math.max(0, i - 1)];
    if (prev) focusSoon(prev.id);
  }

  function insert(blocks: Block[], afterId = activeId) {
    const added = toRows(blocks);
    const i = afterId ? rows.findIndex((r) => r.id === afterId) : -1;
    const at = i >= 0 ? i + 1 : rows.length;
    commit([...rows.slice(0, at), ...added, ...rows.slice(at)]);
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

  function addImages(list: FileList | File[] | null, afterId = activeId) {
    const files = Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    setError(null);
    setUploading((n) => n + files.length);

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

  /** Text came out of a block. Shortcuts fire here, before it is stored.
   *  They match the element's raw text, not `next` — `elementToInline` trims,
   *  and "## " without its trailing space is not a shortcut any more. */
  function textChanged(row: Row, next: string, el: HTMLElement) {
    if (row.block.type === "paragraph") {
      const raw = el.textContent ?? "";
      if (raw.trim() === "---") {
        setText(el, "");
        update(row.id, { type: "divider" });
        return;
      }
      for (const [re, make] of SHORTCUTS) {
        const m = raw.match(re);
        if (m) {
          const rest = raw.slice(m[0].length);
          setText(el, rest);
          update(row.id, make(rest));
          return;
        }
      }
      // "/" on its own opens the block menu.
      if (next.trim() === "/") {
        setMenuFor(row.id);
        return;
      }
      if (menuFor === row.id && next.trim() !== "/") setMenuFor(null);
    }
    update(row.id, withText(row.block, next));
  }

  /** Show the formatting bar whenever there is a live selection inside. */
  function trackSelection() {
    const sel = window.getSelection();
    const surface = surfaceRef.current;
    if (!sel || sel.isCollapsed || sel.rangeCount === 0 || !surface) {
      setFormat(null);
      return;
    }
    if (!surface.contains(sel.anchorNode)) {
      setFormat(null);
      return;
    }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) {
      setFormat(null);
      return;
    }
    setFormat({ top: rect.top - 46, left: rect.left + rect.width / 2 });
  }

  /** execCommand is deprecated but it is the only thing that formats a live
   *  selection without disturbing an IME composition. */
  function applyFormat(command: string, arg?: string) {
    document.execCommand("styleWithCSS", false, "false");
    document.execCommand(command, false, arg);
    const el = document.activeElement as HTMLElement | null;
    const row = rows.find((r) => el?.id === `blk-${r.id}`);
    if (el && row) textChanged(row, elementText(el), el);
    setFormat(null);
  }

  if (source) {
    return (
      <div>
        <div className="flex items-center pb-1">
          <button
            type="button"
            onClick={() => setSource(false)}
            className="t-label ml-auto px-2 text-ink-faint underline underline-offset-4"
          >
            블록으로 편집
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setRows(toRows(parseContent(e.target.value)));
          }}
          rows={26}
          spellCheck={false}
          className="field mt-1 min-h-[32rem] w-full resize-y leading-[1.8]"
        />
        <p className="t-caption mt-2 text-ink-faint">
          문법을 직접 다루는 모드입니다. 블록 편집으로 돌아가면 그대로 반영됩니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 pb-2">
        <ChipButton size="sm" tone="outline" onClick={() => fileRef.current?.click()}>
          + 이미지
        </ChipButton>
        <span className="t-caption text-ink-faint">
          {uploading > 0 ? `이미지 ${uploading}개 올리는 중…` : "/ 를 치면 블록 메뉴가 열립니다"}
        </span>
        <button
          type="button"
          onClick={() => setSource(true)}
          className="t-label ml-auto shrink-0 px-2 text-ink-faint underline underline-offset-4"
        >
          문법으로 편집
        </button>
      </div>

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
        ref={surfaceRef}
        onMouseUp={trackSelection}
        onKeyUp={trackSelection}
        className={cn(
          "surface relative min-h-[30rem] px-6 py-10 sm:px-14 sm:py-14",
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
            menuOpen={menuFor === row.id}
            onOpenMenu={(open) => setMenuFor(open ? row.id : null)}
            onFocus={() => setActiveId(row.id)}
            onText={(next, el) => textChanged(row, next, el)}
            onBlock={(b) => update(row.id, b)}
            onRemove={() => removeAt(row.id)}
            onMove={(by) => move(row.id, by)}
            onSplit={(after) => insert([{ type: "paragraph", text: after }], row.id)}
            onPasteFiles={(files) => addImages(files, row.id)}
            onPickMenu={(make, el) => {
              setMenuFor(null);
              if (el) setText(el, "");
              const b = make("");
              if (b.type === "divider" || b.type === "embed") {
                update(row.id, b);
                insert([{ type: "paragraph", text: "" }], row.id);
              } else {
                update(row.id, b);
                focusSoon(row.id);
              }
            }}
          />
        ))}

        <button
          type="button"
          onClick={() => insert([{ type: "paragraph", text: "" }], rows[rows.length - 1]?.id)}
          className="mt-2 h-10 w-full text-left"
          aria-label="블록 추가"
        />

        {dragging && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-[rgba(255,255,255,0.88)]"
            aria-hidden="true"
          >
            <p className="t-h3 text-accent">놓으면 이 위치에 들어갑니다</p>
          </div>
        )}
      </div>

      {format && (
        <div
          className="surface fixed z-50 flex -translate-x-1/2 items-center gap-1 px-1.5 py-1 shadow-float"
          style={{ top: format.top, left: format.left }}
        >
          <ChipButton size="sm" tone="ghost" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("bold")}>
            <strong>B</strong>
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onMouseDown={(e) => e.preventDefault()} onClick={() => applyFormat("italic")}>
            <em>I</em>
          </ChipButton>
          <ChipButton
            size="sm"
            tone="ghost"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("hiliteColor", "rgba(232,69,42,0.16)")}
          >
            형광
          </ChipButton>
          <ChipButton
            size="sm"
            tone="ghost"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = window.prompt("링크 주소");
              if (url) applyFormat("createLink", url);
            }}
          >
            링크
          </ChipButton>
        </div>
      )}

      <p className="t-caption mt-2 text-ink-faint">
        이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣습니다. <code>## </code> <code>- </code>{" "}
        <code>&gt; </code>처럼 치면 바로 그 블록이 되고, 글자를 선택하면 서식 버튼이 뜹니다.
        {mode === "demo" && " 데모 모드에서는 이미지가 글 안에 직접 담겨 용량이 커집니다."}
      </p>

      {error && <p className="t-caption mt-2 text-accent">{error}</p>}
    </div>
  );
}

/** The rendered text of an editable node, as dialect markers. */
function elementText(el: HTMLElement): string {
  return el.textContent ?? "";
}

/* ── One block ────────────────────────────────────────────── */

function BlockRow({
  row,
  menuOpen,
  onOpenMenu,
  onFocus,
  onText,
  onBlock,
  onRemove,
  onMove,
  onSplit,
  onPasteFiles,
  onPickMenu,
}: {
  row: Row;
  menuOpen: boolean;
  onOpenMenu: (open: boolean) => void;
  onFocus: () => void;
  onText: (next: string, el: HTMLElement) => void;
  onBlock: (b: Block) => void;
  onRemove: () => void;
  onMove: (by: -1 | 1) => void;
  onSplit: (after: string) => void;
  onPasteFiles: (files: File[]) => void;
  onPickMenu: (make: (t: string) => Block, el: HTMLElement | null) => void;
}) {
  const { block, id } = row;

  const keys = (e: React.KeyboardEvent<HTMLDivElement>, el: HTMLDivElement) => {
    if (e.key === "Escape" && menuOpen) {
      onOpenMenu(false);
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const plain = el.textContent ?? "";
      const at = caretOffset(el);
      // Only split when there is no inline markup to slice through.
      if (at < plain.length && plain.trim() === textOf(block).trim()) {
        const before = plain.slice(0, at);
        setText(el, before);
        onText(before, el);
        onSplit(plain.slice(at));
      } else {
        onSplit("");
      }
      return;
    }
    if (e.key === "Backspace" && caretOffset(el) === 0 && !(el.textContent ?? "").trim()) {
      e.preventDefault();
      onRemove();
    }
  };

  const textClass =
    block.type === "heading"
      ? cn("serif-heads font-semibold", block.level === 2 ? "t-h1" : "t-h2")
      : block.type === "quote"
        ? "t-h3 italic"
        : "t-body-lg leading-[1.9]";

  const placeholder =
    block.type === "heading"
      ? block.level === 2
        ? "제목"
        : "소제목"
      : block.type === "quote"
        ? "인용할 문장"
        : block.type === "highlight"
          ? "강조하고 싶은 한 문장"
          : "글을 쓰거나 / 를 눌러보세요";

  return (
    <div className="blk group relative py-1">
      {/* Handle sits outside the text column so the writing surface stays clean. */}
      <div className="blk-handle absolute -left-6 top-1.5 flex flex-col sm:-left-10">
        <button
          type="button"
          onClick={() => onOpenMenu(!menuOpen)}
          className="t-caption h-6 w-6 rounded-sm text-ink-faint transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.06)] hover:text-ink"
          aria-label="블록 메뉴"
        >
          ⋮⋮
        </button>
      </div>

      {menuOpen && (
        <BlockMenu
          onPick={(make) =>
            onPickMenu(make, document.getElementById(`blk-${id}`) as HTMLElement | null)
          }
          onClose={() => onOpenMenu(false)}
          onMove={onMove}
          onRemove={onRemove}
        />
      )}

      {isTextBlock(block) && (
        <div
          className={cn(
            block.type === "quote" && "border-l-2 border-ink pl-4",
            block.type === "highlight" && "rounded-md bg-accent-soft px-4 py-3",
          )}
        >
          <RichText
            id={`blk-${id}`}
            text={textOf(block)}
            placeholder={placeholder}
            className={textClass}
            onFocus={onFocus}
            onChange={(next) => {
              const el = document.getElementById(`blk-${id}`) as HTMLElement | null;
              if (el) onText(next, el);
            }}
            onKeyDown={keys}
            onPasteFiles={onPasteFiles}
          />
          {block.type === "quote" && (
            <input
              value={block.attribution ?? ""}
              onChange={(e) => onBlock({ ...block, attribution: e.target.value })}
              onFocus={onFocus}
              placeholder="— 출처 (선택)"
              className="t-caption mt-2 w-full border-0 bg-transparent p-0 text-ink-muted outline-none placeholder:text-ink-faint"
            />
          )}
        </div>
      )}

      {block.type === "list" && (
        <ul className="space-y-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="t-caption shrink-0 text-ink-faint">
                {block.ordered ? `${i + 1}.` : "•"}
              </span>
              <div className="min-w-0 flex-1">
                <RichText
                  id={i === 0 ? `blk-${id}` : `blk-${id}-${i}`}
                  text={item}
                  placeholder="항목"
                  className="t-body-lg"
                  onFocus={onFocus}
                  onChange={(next) => {
                    const items = [...block.items];
                    items[i] = next;
                    onBlock({ ...block, items });
                  }}
                  onPasteFiles={onPasteFiles}
                  onKeyDown={(e, el) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      const items = [...block.items];
                      // Enter on an empty last item leaves the list.
                      if (!(el.textContent ?? "").trim() && i === items.length - 1) {
                        onBlock({ ...block, items: items.slice(0, -1) });
                        onSplit("");
                        return;
                      }
                      items.splice(i + 1, 0, "");
                      onBlock({ ...block, items });
                    }
                    if (
                      e.key === "Backspace" &&
                      caretOffset(el) === 0 &&
                      !(el.textContent ?? "").trim()
                    ) {
                      e.preventDefault();
                      if (block.items.length > 1) {
                        onBlock({ ...block, items: block.items.filter((_, j) => j !== i) });
                      } else {
                        onBlock({ type: "paragraph", text: "" });
                      }
                    }
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {block.type === "image" && (
        <figure className="my-4">
          {block.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={block.src} alt={block.alt} className="block h-auto w-full rounded-md" />
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
              onChange={(e) => onBlock({ ...block, caption: e.target.value })}
              placeholder="사진 설명 (선택)"
              className="t-caption w-full border-0 bg-transparent p-0 text-center text-ink-muted outline-none placeholder:text-ink-faint"
            />
          </figcaption>
        </figure>
      )}

      {block.type === "embed" && (
        <div className="my-4 rounded-md border border-line px-4 py-3">
          <p className="t-label text-ink-faint">{youtubeId(block.url) ? "YouTube" : "임베드"}</p>
          <input
            id={`blk-${id}`}
            value={block.url}
            onFocus={onFocus}
            onChange={(e) =>
              onBlock({
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
        <div className="py-6" id={`blk-${id}`} tabIndex={-1} onFocus={onFocus}>
          <hr className="border-line" />
        </div>
      )}
    </div>
  );
}

function BlockMenu({
  onPick,
  onClose,
  onMove,
  onRemove,
}: {
  onPick: (make: (t: string) => Block) => void;
  onClose: () => void;
  onMove: (by: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default"
        onClick={onClose}
        aria-label="메뉴 닫기"
      />
      <div className="surface absolute left-0 top-8 z-50 w-56 overflow-hidden py-1.5 shadow-float">
        {MENU.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => onPick(m.make)}
            className="flex w-full items-baseline justify-between gap-4 px-3 py-1.5 text-left transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.05)]"
          >
            <span className="t-body">{m.label}</span>
            <span className="t-caption text-ink-faint">{m.hint}</span>
          </button>
        ))}
        <div className="mt-1.5 flex gap-1 border-t border-line px-2 pt-1.5">
          <ChipButton size="sm" tone="ghost" onClick={() => onMove(-1)}>
            ↑
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={() => onMove(1)}>
            ↓
          </ChipButton>
          <ChipButton size="sm" tone="ghost" onClick={onRemove}>
            삭제
          </ChipButton>
        </div>
      </div>
    </>
  );
}
