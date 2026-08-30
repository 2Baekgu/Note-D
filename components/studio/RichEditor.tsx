"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { CaptionedImage } from "./CaptionedImage";
import { ImageRow } from "./ImageRow";
import { Youtube } from "./YoutubeNode";
import { baseExtensions } from "@/lib/content/extensions";
import { EditorToolbar } from "./EditorToolbar";
import { Bookmark } from "./BookmarkNode";
import Placeholder from "@tiptap/extension-placeholder";
import { blocksToDoc, isDoc, type DocNode } from "@/lib/content/doc";
import { parseContent } from "@/lib/content/parse";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { uploadImage } from "@/lib/studio";
import { dropIntoRow, dropPos, rowDropMark } from "@/lib/content/drop-row";
import { parseYoutube } from "@/lib/content/nodes/youtube";
import { cn } from "@/lib/utils";

interface LinkChoice {
  url: string;
  /** Absolute document positions of the bare URL text. */
  from: number;
  to: number;
  /** Where to draw the menu, relative to the sheet. */
  x: number;
  y: number;
}

const CHOICES = [
  { label: "URL 그대로", hint: "링크 텍스트로 둡니다" },
  { label: "북마크로", hint: "썸네일 카드로 바꿉니다" },
];

/** Offered only for a YouTube link, where playing it in place is almost
 *  always what was meant. */
const VIDEO_CHOICE = {
  label: "동영상으로",
  hint: "여기서 재생되는 영상으로 넣습니다",
};

/** The article editor, on ProseMirror by way of TipTap — the same engine
 *  Notion-style editors are built on. It owns selection, undo, IME and paste,
 *  which is the whole reason to use it rather than keep hand-rolling.
 *
 *  Documents are stored as TipTap JSON. Anything written before the switch is
 *  read through the old parser and converted on the way in, so an article
 *  opens the same whichever format it happens to be in. */
export function RichEditor({
  value,
  onChange,
  meta,
  header,
  tools = "full",
  compact = false,
  placeholder,
  folder = "body",
}: {
  value: string;
  onChange: (next: string) => void;
  /** Small text for the toolbar's right side, e.g. the length. */
  meta?: React.ReactNode;
  /** Sits inside the sheet above the body, on the body's own column —
   *  the title, in practice. */
  header?: React.ReactNode;
  /** `"image"` keeps the picture button and drops the block styles — for a
   *  box where the writing matters and the formatting does not. */
  tools?: "full" | "image";
  /** A shorter sheet, for a box inside a dialog. */
  compact?: boolean;
  placeholder?: string;
  /** Where uploads land. Bug-report screenshots go somewhere a guest is
   *  allowed to write, which the article folders are not. */
  folder?: "body" | "bug-reports";
}) {
  const { mode } = useAuth();
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  // Set when Enter lands at the end of a bare URL: the choice between leaving
  // it as a link and expanding it into a card.
  const [linkChoice, setLinkChoice] = useState<LinkChoice | null>(null);
  const [choice, setChoice] = useState(0);
  const video = linkChoice ? parseYoutube(linkChoice.url) : null;
  const choices = video ? [...CHOICES, VIDEO_CHOICE] : CHOICES;
  const [fetching, setFetching] = useState(false);

  // Seeded once; TipTap owns the document from here on.
  const [initial] = useState<DocNode>(() =>
    isDoc(value)
      ? (JSON.parse(value.trim()) as DocNode)
      : blocksToDoc(parseContent(value)),
  );

  // The menu is driven from the keyboard because the caret never leaves the
  // editor: arrows move the selection, Enter takes it, Escape drops it.
  useEffect(() => {
    if (!linkChoice) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        setChoice((i) => (i + 1) % choices.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        if (choice === 0) keepUrl();
        else if (choice === 1) void makeBookmark();
        else makeVideo();
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setLinkChoice(null);
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  });

  const editor = useEditor({
    // Next renders this on the server first; TipTap must wait for the client.
    immediatelyRender: false,
    extensions: [
      ...baseExtensions,
      CaptionedImage,
      ImageRow,
      Youtube,
      Bookmark,
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading"
            ? "제목"
            : (placeholder ?? "글을 쓰거나 이미지를 끌어다 놓으세요"),
      }),
    ],
    content: initial,
    onUpdate: ({ editor: e }) => onChange(JSON.stringify(e.getJSON())),
    editorProps: {
      attributes: { class: "tiptap" },
      handleKeyDown: (view, event) => {
        if (event.key !== "Enter" || event.shiftKey || event.isComposing)
          return false;
        const { selection } = view.state;
        if (!selection.empty) return false;

        const $from = selection.$from;
        const before = $from.parent.textBetween(
          0,
          $from.parentOffset,
          undefined,
          " ",
        );
        const match = before.match(/(https?:\/\/\S+)$/);
        if (!match) return false;

        const url = match[1];
        const to = $from.pos;
        const box = sheetRef.current?.getBoundingClientRect();
        const caret = view.coordsAtPos(to);
        setChoice(0);
        setLinkChoice({
          url,
          from: to - url.length,
          to,
          x: box ? caret.left - box.left : caret.left,
          y: box ? caret.bottom - box.top : caret.bottom,
        });
        return true; // swallow the Enter until a choice is made
      },
      handlePaste: (_view, event) => {
        const files = imagesFrom(event.clipboardData);
        if (!files.length) return false;
        event.preventDefault();
        void insertImages(files);
        return true;
      },
      handleDOMEvents: {
        // Drawn by hand because ProseMirror's cursor is always a horizontal
        // rule: correct between stacked blocks, wrong between two pictures
        // sharing a line, where the gap is a column and not a row.
        dragover: (view, event) => {
          showRowMark(rowDropMark(view, event as DragEvent));
          return false;
        },
        dragleave: () => {
          showRowMark(null);
          return false;
        },
        dragend: () => {
          showRowMark(null);
          return false;
        },
        drop: () => {
          showRowMark(null);
          return false;
        },
      },
      handleDrop: (view, event, slice, moved) => {
        // Files from outside: anywhere inside the editor counts. Landing on a
        // block exactly is not something a person aims for.
        const files = imagesFrom((event as DragEvent).dataTransfer);
        if (files.length) {
          event.preventDefault();
          void insertImages(files, dropPos(view, event as DragEvent));
          return true;
        }
        // A picture dropped beside another picture means "side by side". No
        // switch to flip first: where it lands is the instruction.
        return dropIntoRow(view, event as DragEvent, slice, moved);
      },
    },
  });

  const rowMark = useRef<HTMLDivElement>(null);

  function imagesFrom(data: DataTransfer | null) {
    return Array.from(data?.files ?? []).filter((f) =>
      f.type.startsWith("image/"),
    );
  }

  /** `at` is where a drop landed. Without one the pictures go wherever the
   *  caret is, which is what a paste or a toolbar pick means. */
  async function insertImages(files: File[], at?: number | null) {
    if (!editor) return;
    setError(null);
    setUploading((n) => n + files.length);

    // The first picture lands at the drop point; the rest queue after it.
    let cursor = typeof at === "number" ? at : null;

    for (const file of files) {
      const res = await uploadImage(file, folder);
      setUploading((n) => n - 1);
      if (!res.url) {
        setError(res.error ?? "업로드에 실패했습니다.");
        continue;
      }
      const image = {
        src: res.url,
        alt: file.name.replace(/\.[^.]+$/, ""),
        ...(await naturalSize(res.url)),
      };

      if (cursor === null) {
        editor.chain().focus().setImage(image).run();
        continue;
      }
      const docSize = editor.state.doc.content.size;
      const pos = Math.min(Math.max(cursor, 0), docSize);
      editor
        .chain()
        .focus()
        .insertContentAt(pos, { type: "image", attrs: image })
        .run();
      cursor = editor.state.selection.to;
    }
  }

  /** Position the vertical mark, or take it away. Written straight to the
   *  node: `dragover` fires on every pointer move and React has no business
   *  re-rendering the sheet that often. */
  function showRowMark(
    spot: { left: number; top: number; height: number } | null,
  ) {
    const el = rowMark.current;
    const sheet = sheetRef.current;
    if (!el || !sheet) return;

    if (!spot) {
      el.style.display = "none";
      sheet.removeAttribute("data-row-drop");
      return;
    }
    const box = sheet.getBoundingClientRect();
    el.style.display = "block";
    el.style.left = `${spot.left - box.left}px`;
    el.style.top = `${spot.top - box.top}px`;
    el.style.height = `${spot.height}px`;
    // Hides ProseMirror's own cursor, which would otherwise draw a second,
    // contradictory line under the picture.
    sheet.setAttribute("data-row-drop", "true");
  }

  /** A picture's own shape, read once it has loaded. A row divides the line
   *  by these, so the pictures end up the same height. */
  function naturalSize(
    src: string,
  ): Promise<{ width?: number; height?: number }> {
    return new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () =>
        resolve({ width: probe.naturalWidth, height: probe.naturalHeight });
      probe.onerror = () => resolve({});
      probe.src = src;
    });
  }

  /** Leaves the URL where it is and finishes the Enter we swallowed. */
  function keepUrl() {
    if (!editor || !linkChoice) return;
    editor
      .chain()
      .focus()
      .setTextSelection({ from: linkChoice.from, to: linkChoice.to })
      .setLink({ href: linkChoice.url })
      .setTextSelection(linkChoice.to)
      .unsetMark("link")
      .splitBlock()
      .run();
    setLinkChoice(null);
  }

  /** Swaps the URL for a card. The metadata is fetched once, here — a reader
   *  should never wait on someone else's server. */
  /** Swap the bare link for the video itself. */
  function makeVideo() {
    if (!editor || !linkChoice || !video) return;
    const { from, to } = linkChoice;
    editor
      .chain()
      .focus()
      .insertContentAt(
        { from, to },
        {
          type: "youtube",
          attrs: { videoId: video.id, start: video.start, title: "" },
        },
      )
      .run();
    setLinkChoice(null);
  }

  async function makeBookmark() {
    if (!editor || !linkChoice) return;
    const { url, from, to } = linkChoice;
    setFetching(true);

    let attrs = {
      url,
      title: url,
      description: "",
      image: "",
      site: (() => {
        try {
          return new URL(url).hostname.replace(/^www\./, "");
        } catch {
          return "";
        }
      })(),
    };
    try {
      const res = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`,
      );
      if (res.ok) attrs = { ...attrs, ...(await res.json()) };
    } catch {
      /* the card still works with just the address */
    }

    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContent([{ type: "bookmark", attrs }, { type: "paragraph" }])
      .run();
    setFetching(false);
    setLinkChoice(null);
  }

  if (!editor) {
    return (
      <div
        className={cn(
          "surface",
          compact
            ? "min-h-[12rem] px-5 py-5"
            : "min-h-[30rem] px-6 py-10 sm:px-14",
        )}
      />
    );
  }

  return (
    <div>
      {tools === "image" ? (
        <ImageOnlyToolbar
          editor={editor}
          uploading={uploading}
          onPick={insertImages}
          meta={meta}
        />
      ) : (
        <EditorToolbar
          editor={editor}
          uploading={uploading}
          onPickImage={insertImages}
          meta={meta}
        />
      )}

      <div
        ref={sheetRef}
        /* The sheet is a wide page with generous margins, and a picture
           dragged in lands wherever the hand lets go. ProseMirror only hears
           about drops on the text itself, so the margin is caught here and
           the picture goes to the end rather than nowhere. */
        onDragOver={(e) => {
          if (Array.from(e.dataTransfer.types).includes("Files"))
            e.preventDefault();
        }}
        onDrop={(e) => {
          // Inside the text, ProseMirror has already dealt with it.
          if (editor?.view.dom.contains(e.target as Node)) return;
          const files = imagesFrom(e.dataTransfer);
          if (!files.length) return;
          e.preventDefault();
          const at = editor ? dropPos(editor.view, e.nativeEvent) : null;
          void insertImages(
            files,
            at ?? editor?.state.doc.content.size ?? null,
          );
        }}
        className={cn(
          "surface relative mt-3",
          compact
            ? "min-h-[12rem] px-5 py-5"
            : "min-h-[34rem] px-6 py-12 sm:px-14 sm:py-16",
        )}
      >
        {header && (
          <div className="editor-column mb-10 border-b border-line pb-8">
            {header}
          </div>
        )}
        <EditorContent editor={editor} />

        {/* Where a dragged picture would land when it lands beside another:
            a column edge, so a column rule. */}
        <div
          ref={rowMark}
          className="editor-row-mark"
          style={{ display: "none" }}
        />

        {linkChoice && (
          <div
            role="listbox"
            aria-label="링크를 어떻게 넣을까요"
            className="surface absolute z-30 w-56 overflow-hidden py-1 shadow-float"
            style={{ left: linkChoice.x, top: linkChoice.y + 6 }}
          >
            {choices.map((c, i) => (
              <button
                key={c.label}
                type="button"
                role="option"
                aria-selected={choice === i}
                onMouseEnter={() => setChoice(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (i === 0) keepUrl();
                  else if (i === 1) void makeBookmark();
                  else makeVideo();
                }}
                className={cn(
                  "block w-full px-3 py-2 text-left transition-colors duration-[var(--duration-fast)]",
                  choice === i && "bg-[rgba(22,21,15,0.05)]",
                )}
              >
                <span className="t-body block">{c.label}</span>
                <span className="t-caption block text-ink-faint">
                  {fetching && i === 1 ? "불러오는 중…" : c.hint}
                </span>
              </button>
            ))}
            <p className="t-caption border-t border-line px-3 pb-1 pt-2 text-ink-faint">
              ↑↓ 선택 · Enter 확인 · Esc 취소
            </p>
          </div>
        )}
      </div>

      {/* Selecting a picture offers its caption. `title` is where TipTap keeps
          it and where the renderer reads it from. A picture standing on its
          own can also be turned into a row, which is where the second one
          gets dragged. */}
      <BubbleMenu
        editor={editor}
        pluginKey="imageMenu"
        shouldShow={({ editor: e }) =>
          e.isActive("image") && !e.isActive("imageRow")
        }
        className="surface flex items-center gap-2 px-2 py-1.5 shadow-float"
      >
        <span className="t-label shrink-0 text-ink-faint">주석</span>
        <input
          value={(editor.getAttributes("image").title as string) ?? ""}
          onChange={(e) =>
            /* No `.focus()`: the selection is remembered while the caret
               sits in this box, and pulling focus back to the editor between
               keystrokes is how an IME composition gets cut in half. */
            editor.commands.updateAttributes("image", { title: e.target.value })
          }
          placeholder="사진 설명을 적어주세요"
          className="t-caption w-56 border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
        />
        <ChipButton
          size="sm"
          tone="ghost"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().deleteSelection().run()}
        >
          삭제
        </ChipButton>
      </BubbleMenu>

      {/* A row: one caption for the lot. Which pictures are in it, and in
          what order, is said by dragging them — there is nothing here to
          press for that. */}
      <BubbleMenu
        editor={editor}
        pluginKey="imageRowMenu"
        shouldShow={({ editor: e }) => e.isActive("imageRow")}
        className="surface flex items-center gap-2 px-2 py-1.5 shadow-float"
      >
        <span className="t-label shrink-0 text-ink-faint">주석</span>
        <input
          value={(editor.getAttributes("imageRow").caption as string) ?? ""}
          onChange={(e) =>
            editor.commands.updateAttributes("imageRow", {
              caption: e.target.value,
            })
          }
          placeholder="사진 설명을 적어주세요"
          className="t-caption w-56 border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
        />
        <ChipButton
          size="sm"
          tone="ghost"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().deleteSelection().run()}
        >
          삭제
        </ChipButton>
      </BubbleMenu>

      <p className="t-caption mt-2 text-ink-faint">
        {tools === "image" ? (
          "이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣을 수 있습니다."
        ) : (
          <>
            이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣습니다. <code>## </code>{" "}
            <code>- </code> <code>&gt; </code>처럼 치면 바로 그 블록이 되고,
            글자를 선택하면 서식 버튼이 뜹니다.
          </>
        )}
        {mode === "demo" &&
          " 데모 모드에서는 이미지가 글 안에 직접 담겨 용량이 커집니다."}
      </p>

      {error && <p className="t-caption mt-2 text-accent">{error}</p>}
    </div>
  );
}

/** The strip the bug-report dialog gets: a picture button and nothing else,
 *  because a report needs evidence, not formatting. */
function ImageOnlyToolbar({
  editor,
  uploading,
  onPick,
  meta,
}: {
  editor: Editor;
  uploading: number;
  onPick: (files: File[]) => void;
  meta?: React.ReactNode;
}) {
  return (
    <div className="scroll-x flex items-center gap-1.5 pb-1">
      <label
        className={cn("chip chip-outline chip-sm shrink-0 cursor-pointer")}
      >
        + 이미지
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            onPick(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </label>

      {uploading > 0 && (
        <span className="t-caption ml-1 shrink-0 text-ink-faint">
          이미지 {uploading}개 올리는 중…
        </span>
      )}

      {meta && (
        <span className="t-caption ml-auto shrink-0 text-ink-faint">
          {meta}
        </span>
      )}

      <span
        className={cn("flex shrink-0 items-center gap-1", !meta && "ml-auto")}
      >
        <ChipButton
          size="sm"
          tone="ghost"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          title="실행 취소"
        >
          ↺
        </ChipButton>
        <ChipButton
          size="sm"
          tone="ghost"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          title="다시 실행"
        >
          ↻
        </ChipButton>
      </span>
    </div>
  );
}
