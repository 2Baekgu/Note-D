"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { CaptionedImage } from "./CaptionedImage";
import { Bookmark } from "./BookmarkNode";
import Placeholder from "@tiptap/extension-placeholder";
import { blocksToDoc, isDoc, type DocNode } from "@/lib/content/doc";
import { parseContent } from "@/lib/content/parse";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { uploadImage } from "@/lib/studio";
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
  const [fetching, setFetching] = useState(false);

  // Seeded once; TipTap owns the document from here on.
  const [initial] = useState<DocNode>(() =>
    isDoc(value) ? (JSON.parse(value.trim()) as DocNode) : blocksToDoc(parseContent(value)),
  );

  // The menu is driven from the keyboard because the caret never leaves the
  // editor: arrows move the selection, Enter takes it, Escape drops it.
  useEffect(() => {
    if (!linkChoice) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        setChoice((i) => (i + 1) % CHOICES.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        if (choice === 0) keepUrl();
        else void makeBookmark();
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
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, HTMLAttributes: { rel: "noreferrer noopener" } },
      }),
      CaptionedImage,
      Bookmark,
      Highlight,
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
        if (event.key !== "Enter" || event.shiftKey || event.isComposing) return false;
        const { selection } = view.state;
        if (!selection.empty) return false;

        const $from = selection.$from;
        const before = $from.parent.textBetween(0, $from.parentOffset, undefined, " ");
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
      handleDrop: (_view, event) => {
        const files = imagesFrom((event as DragEvent).dataTransfer);
        if (!files.length) return false;
        event.preventDefault();
        void insertImages(files);
        return true;
      },
    },
  });

  function imagesFrom(data: DataTransfer | null) {
    return Array.from(data?.files ?? []).filter((f) => f.type.startsWith("image/"));
  }

  async function insertImages(files: File[]) {
    if (!editor) return;
    setError(null);
    setUploading((n) => n + files.length);

    for (const file of files) {
      const res = await uploadImage(file, folder);
      setUploading((n) => n - 1);
      if (res.url) {
        editor
          .chain()
          .focus()
          .setImage({ src: res.url, alt: file.name.replace(/\.[^.]+$/, "") })
          .run();
      } else {
        setError(res.error ?? "업로드에 실패했습니다.");
      }
    }
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
      const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
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
          compact ? "min-h-[12rem] px-5 py-5" : "min-h-[30rem] px-6 py-10 sm:px-14",
        )}
      />
    );
  }

  return (
    <div>
      <Toolbar
        editor={editor}
        uploading={uploading}
        onPick={insertImages}
        meta={meta}
        tools={tools}
      />

      <div
        ref={sheetRef}
        className={cn(
          "surface relative mt-3",
          compact
            ? "min-h-[12rem] px-5 py-5"
            : "min-h-[34rem] px-6 py-12 sm:px-14 sm:py-16",
        )}
      >
        {header && (
          <div className="editor-column mb-10 border-b border-line pb-8">{header}</div>
        )}
        <EditorContent editor={editor} />

        {linkChoice && (
          <div
            role="listbox"
            aria-label="링크를 어떻게 넣을까요"
            className="surface absolute z-30 w-56 overflow-hidden py-1 shadow-float"
            style={{ left: linkChoice.x, top: linkChoice.y + 6 }}
          >
            {CHOICES.map((c, i) => (
              <button
                key={c.label}
                type="button"
                role="option"
                aria-selected={choice === i}
                onMouseEnter={() => setChoice(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => (i === 0 ? keepUrl() : void makeBookmark())}
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
          it and where the renderer reads it from. */}
      <BubbleMenu
        editor={editor}
        pluginKey="imageMenu"
        shouldShow={({ editor: e }) => e.isActive("image")}
        className="surface flex items-center gap-2 px-2 py-1.5 shadow-float"
      >
        <span className="t-label shrink-0 text-ink-faint">주석</span>
        <input
          value={(editor.getAttributes("image").title as string) ?? ""}
          onChange={(e) =>
            editor.chain().focus().updateAttributes("image", { title: e.target.value }).run()
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

      <BubbleMenu
        editor={editor}
        pluginKey="textMenu"
        shouldShow={({ editor: e, from, to }) => !e.isActive("image") && from !== to}
        className="surface flex items-center gap-1 px-1.5 py-1 shadow-float"
      >
        <Mark editor={editor} name="bold" onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Mark>
        <Mark editor={editor} name="italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Mark>
        <Mark editor={editor} name="highlight" onClick={() => editor.chain().focus().toggleHighlight().run()}>
          형광
        </Mark>
        <Mark editor={editor} name="code" onClick={() => editor.chain().focus().toggleCode().run()}>
          코드
        </Mark>
        <Mark
          editor={editor}
          name="link"
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            const url = window.prompt("링크 주소");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          링크
        </Mark>
      </BubbleMenu>

      <p className="t-caption mt-2 text-ink-faint">
        {tools === "image" ? (
          "이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣을 수 있습니다."
        ) : (
          <>
            이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣습니다. <code>## </code> <code>- </code>{" "}
            <code>&gt; </code>처럼 치면 바로 그 블록이 되고, 글자를 선택하면 서식 버튼이 뜹니다.
          </>
        )}
        {mode === "demo" && " 데모 모드에서는 이미지가 글 안에 직접 담겨 용량이 커집니다."}
      </p>

      {error && <p className="t-caption mt-2 text-accent">{error}</p>}
    </div>
  );
}

function Mark({
  editor,
  name,
  onClick,
  children,
}: {
  editor: Editor;
  name: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ChipButton
      size="sm"
      tone={editor.isActive(name) ? "solid" : "ghost"}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </ChipButton>
  );
}

function Toolbar({
  editor,
  uploading,
  onPick,
  meta,
  tools,
}: {
  editor: Editor;
  uploading: number;
  onPick: (files: File[]) => void;
  meta?: React.ReactNode;
  tools: "full" | "image";
}) {
  const items: { label: string; active: string; attrs?: Record<string, unknown>; run: () => void }[] =
    tools === "image" ? [] : [
      { label: "본문", active: "paragraph", run: () => editor.chain().focus().setParagraph().run() },
      {
        label: "제목",
        active: "heading",
        attrs: { level: 2 },
        run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        label: "소제목",
        active: "heading",
        attrs: { level: 3 },
        run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      { label: "인용", active: "blockquote", run: () => editor.chain().focus().toggleBlockquote().run() },
      { label: "목록", active: "bulletList", run: () => editor.chain().focus().toggleBulletList().run() },
      { label: "번호", active: "orderedList", run: () => editor.chain().focus().toggleOrderedList().run() },
      { label: "구분선", active: "horizontalRule", run: () => editor.chain().focus().setHorizontalRule().run() },
    ];

  return (
    <div className="scroll-x flex items-center gap-1.5 pb-1">
      {items.map((item) => (
        <ChipButton
          key={item.label}
          size="sm"
          tone={editor.isActive(item.active, item.attrs) ? "solid" : "ghost"}
          onClick={item.run}
        >
          {item.label}
        </ChipButton>
      ))}

      {items.length > 0 && (
        <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
      )}

      <label className={cn("chip chip-outline chip-sm shrink-0 cursor-pointer")}>
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

      {meta && <span className="t-caption ml-auto shrink-0 text-ink-faint">{meta}</span>}

      <span className={cn("flex shrink-0 items-center gap-1", !meta && "ml-auto")}>
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
