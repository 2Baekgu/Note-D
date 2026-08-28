"use client";

import { useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { CaptionedImage } from "./CaptionedImage";
import Placeholder from "@tiptap/extension-placeholder";
import { blocksToDoc, isDoc, type DocNode } from "@/lib/content/doc";
import { parseContent } from "@/lib/content/parse";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { uploadImage } from "@/lib/studio";
import { cn } from "@/lib/utils";

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
  header,
  meta,
}: {
  value: string;
  onChange: (next: string) => void;
  /** Title and subtitle, drawn inside the sheet on the same measure as the
   *  body — otherwise they sit on a different left edge to the words. */
  header?: React.ReactNode;
  /** Small text for the toolbar's right side, e.g. the length. */
  meta?: React.ReactNode;
}) {
  const { mode } = useAuth();
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Seeded once; TipTap owns the document from here on.
  const [initial] = useState<DocNode>(() =>
    isDoc(value) ? (JSON.parse(value.trim()) as DocNode) : blocksToDoc(parseContent(value)),
  );

  const editor = useEditor({
    // Next renders this on the server first; TipTap must wait for the client.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, HTMLAttributes: { rel: "noreferrer noopener" } },
      }),
      CaptionedImage,
      Highlight,
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading" ? "제목" : "글을 쓰거나 이미지를 끌어다 놓으세요",
      }),
    ],
    content: initial,
    onUpdate: ({ editor: e }) => onChange(JSON.stringify(e.getJSON())),
    editorProps: {
      attributes: { class: "tiptap" },
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
      const res = await uploadImage(file, "body");
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

  if (!editor) {
    return <div className="surface min-h-[30rem] px-6 py-10 sm:px-14" />;
  }

  return (
    <div>
      <Toolbar editor={editor} uploading={uploading} onPick={insertImages} meta={meta} />

      {/* One sheet. Title, subtitle and body share its measure, so everything
          you type lines up on the same left edge. */}
      <div className="surface mt-3 min-h-[34rem] px-6 py-12 sm:px-14 sm:py-16">
        {header && (
          <div className="mx-auto mb-12 max-w-[var(--measure)]">{header}</div>
        )}
        <EditorContent editor={editor} />
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
        이미지는 끌어다 놓거나 붙여넣기(⌘V)로 넣습니다. <code>## </code> <code>- </code>{" "}
        <code>&gt; </code>처럼 치면 바로 그 블록이 되고, 글자를 선택하면 서식 버튼이 뜹니다.
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
}: {
  editor: Editor;
  uploading: number;
  onPick: (files: File[]) => void;
  meta?: React.ReactNode;
}) {
  const items: { label: string; active: string; attrs?: Record<string, unknown>; run: () => void }[] =
    [
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

      <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />

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
