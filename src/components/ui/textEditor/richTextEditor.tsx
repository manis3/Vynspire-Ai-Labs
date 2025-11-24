"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";

import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ListOrderedIcon,
  UndoIcon,
  RedoIcon,
  HeadingIcon,
  QuoteIcon,
  CodeIcon,
  LinkIcon,
  ColorIcon,
} from "@/assets/svgs";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Custom extension that adds the setTextStyle command
const CustomTextStyle = TextStyle.extend({
  addCommands() {
    return {
      setTextStyle:
        (attributes: Record<string, any>) =>
        ({ chain }: { chain: any }) => {
          return chain().setMark("textStyle", attributes).run();
        },
    };
  },
});

const fontFamilies = [
  { name: "Default", value: "inherit" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
  { name: "Georgia", value: "Georgia, serif" },
];

const fontSizes = [12, 14, 16, 18, 24, 32, 48];

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      CustomTextStyle, // only use custom extension here
      Underline,
      Color,
      Highlight,
      Link,
      Placeholder.configure({ placeholder: "Start typing here..." }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor prose max-w-full min-h-[300px] p-4 rounded-md outline-none",
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };

  const colors = [
    "#000000",
    "#f44336",
    "#2196f3",
    "#ff9800",
    "#4caf50",
    "#9c27b0",
  ];

  return (
    <>
      <style>{`
        .tiptap-editor {
          border: 1px solid #ccc;
          box-shadow: inset 0 1px 3px #ddd;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          background-color: #fff;
          color: #000;
        }
        .tiptap-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px;
          border-radius: 6px;
          background: #f3f3f3;
          box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
          margin-bottom: 8px;
        }
        .tiptap-toolbar button {
          background: transparent;
          border: none;
          padding: 6px 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .tiptap-toolbar button:hover, .tiptap-toolbar button.active {
          background-color: #dcdcdc;
        }
        .tiptap-toolbar select {
          background: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 5px 8px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
        }
        .color-button {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid #999;
          cursor: pointer;
        }
      `}</style>

      <div className="tiptap-toolbar">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().undo().run()}
          className="hover:bg-gray-300"
          title="Undo"
        >
          <UndoIcon />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().redo().run()}
          className="hover:bg-gray-300"
          title="Redo"
        >
          <RedoIcon />
        </Button>

        <select
          onChange={(e) => {
            const lvl = parseInt(e.target.value);
            if (lvl === 0) editor.chain().focus().setParagraph().run();
            else
              editor
                .chain()
                .focus()
                .toggleHeading({ level: lvl as 1 | 2 | 3 })
                .run();
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? 1
              : editor.isActive("heading", { level: 2 })
                ? 2
                : editor.isActive("heading", { level: 3 })
                  ? 3
                  : 0
          }
          title="Paragraph / Heading"
        >
          <option value={0}>Paragraph</option>
          <option value={1}>Heading 1</option>
          <option value={2}>Heading 2</option>
          <option value={3}>Heading 3</option>
        </select>

        <select
          onChange={(e) =>
            (editor.chain() as any)
              .focus()
              .setTextStyle({ fontFamily: e.target.value })
              .run()
          }
          value={editor.getAttributes("textStyle").fontFamily || "inherit"}
          title="Font Family"
        >
          {fontFamilies.map((f) => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) =>
            (editor.chain() as any)
              .focus()
              .setTextStyle({ fontSize: `${e.target.value}px` })
              .run()
          }
          value={
            editor.getAttributes("textStyle").fontSize?.replace("px", "") ||
            "16"
          }
          title="Font Size"
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
          title="Bold"
        >
          <BoldIcon />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
          title="Italic"
        >
          <ItalicIcon />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
          title="Underline"
        >
          <UnderlineIcon />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
          title="Bullet List"
        >
          <ListIcon />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
          title="Ordered List"
        >
          <ListOrderedIcon />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "active" : ""}
          title="Blockquote"
        >
          <QuoteIcon />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "active" : ""}
          title="Code Block"
        >
          <CodeIcon />
        </Button>
        <Button variant="ghost" size="sm" onClick={addLink} title="Add Link">
          <LinkIcon />
        </Button>

        {colors.map((color) => (
          <button
            key={color}
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => editor.chain().focus().setColor(color).run()}
            title={`Set color ${color}`}
            aria-label={`Set color ${color}`}
          />
        ))}
      </div>

      <EditorContent
        editor={editor}
        className="h-[100px] max-h-[100px] overflow-scroll scrollbar-none"
      />
    </>
  );
}
