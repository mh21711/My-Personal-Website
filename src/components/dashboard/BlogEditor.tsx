"use client";

import { useTheme } from "next-themes";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote, createReactBlockSpec } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs, defaultProps } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "katex/dist/katex.min.css"; 
import { useMemo } from "react";
import katex from "katex";
import { getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";


// 1. Define the Math-Aware Code Block
const MathCodeBlock = createReactBlockSpec(
  {
    type: "math",
    propSchema: {
      code: { default: "a^2 + b^2 = c^2" },
      // Use standard alignment prop
      textAlignment: defaultProps.textAlignment, 
    },
    content: "none",
  },
  {
    render: (props) => {
      const { code } = props.block.props;
      
      // If we are NOT in edit mode, render the Math
      if (!props.editor.isEditable) {
        let html = "";
        try {
          html = katex.renderToString(code, { displayMode: true, throwOnError: false });
        } catch (e) {
          html = "Syntax Error in LaTeX";
        }
        return (
          <div 
            className="text-center overflow-x-auto selection:bg-blue-200 text-2xl"
            dangerouslySetInnerHTML={{ __html: html }}
            dir="ltr" 
          />
        );
      }

      // If we ARE in edit mode, show the input field
      return (
        <div className="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg border border-gray-300 dark:border-zinc-700">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">LaTeX Math Input</label>
          <textarea
            className="w-full bg-transparent font-mono text-sm outline-none resize-none"
            value={code}
            onChange={(e) => props.editor.updateBlock(props.block, {
              props: { code: e.target.value }
            })}
            rows={2}
          />
        </div>
      );
    },
  }
);

// 2. Create the Schema
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    math: MathCodeBlock(),
  },
});

// 1. Derive the custom editor type from your schema
type CustomEditor = typeof schema.BlockNoteEditor;

// Function to create the menu item
const insertMath = (editor: CustomEditor) => ({
  title: "Math",
  onItemClick: () => {
    editor.insertBlocks(
      [{ type: "math", props: { code: "e=mc^2" } }],
      editor.getTextCursorPosition().block,
      "after"
    );
  },
  aliases: ["math", "latex", "formula"],
  group: "Other",
  // Optional: add an icon here
});

// Update your component's list
const slashMenuItems = (editor: CustomEditor) => [
  ...getDefaultReactSlashMenuItems(editor),
  insertMath(editor),
];

interface EditorProps {
  initialContent?: string;
  onChange?: (json: string) => void;
  editable?: boolean;
}

export default function BlogEditor({ initialContent, onChange, editable = true }: EditorProps) {
  const { resolvedTheme } = useTheme();

  const initialBlocks = useMemo(() => {
    try {
      return initialContent ? JSON.parse(initialContent) : undefined;
    } catch {
      return undefined;
    }
  }, [initialContent]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body: formData });
    if (!response.ok) throw new Error("Failed to upload image");
    const data = await response.json();
    return data.url;
  };

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialBlocks,
    uploadFile: handleUpload,
  });

  return (
    <div className="min-h-50">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        onChange={() => {
          onChange?.(JSON.stringify(editor.document));
        }}
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query: string) => { // Explicitly type query as string
            const items = slashMenuItems(editor);
            
            // Manual filter logic: matches title or aliases
            return items.filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.aliases?.some((alias) => 
                alias.toLowerCase().includes(query.toLowerCase())
              )
            );
          }}
        />
      </BlockNoteView>
    </div>
  );
}