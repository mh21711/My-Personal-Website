"use client";

import { useTheme } from "next-themes";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";

interface EditorProps {
  initialContent?: string; // Add this to receive existing description
  onChange: (json: string) => void;
  editable?: boolean;
}

export default function BlogEditor({ initialContent, onChange, editable = true }: EditorProps) {
  const { resolvedTheme } = useTheme();

  // Parse the string back into BlockNote blocks
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
    initialContent: initialBlocks, // Set the initial data here
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      editable={editable}
      onChange={() => {
        onChange(JSON.stringify(editor.document));
      }}
    />
  );
}