"use client";

import { useEditor, BubbleMenu, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { ToolsContainer } from "./tools/ToolsContainer";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
// import { FloatingContainer } from "./tools/FloatingContainer";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
// import { useAutosaveIndicator } from "@/context/AutosaveIndicator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const limit = 600;

interface Props {
  content?: JSON;
  taskId: string;
  workspaceId: string;
}

export const EditorTasks = ({ content, taskId, workspaceId }: Props) => {
  const t = useTranslations("TASK");
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer w-full focus-visible:outline-none rounded-md max-w-none prose-code:text-secondary-foreground prose-code:bg-muted  prose-ol:text-secondary-foreground prose-ul:text-secondary-foreground prose-li:marker:text-secondary-foreground prose-li:marker:font-bold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-p:text-base prose-headings:line-clamp-1 prose-headings:mt-0 prose-p:my-2",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link,
      Color,
      TextStyle,
    ],
    content: `
    <h1 class="text-4xl">This is a 1st level heading</h1>
    <h2 class="text-3xl">This is a 2nd level heading</h2>
    <h3 class="text-2xl">This is a 3rd level heading</h3>
    <p>This is a paragragh</p>
    `,
  });
  return (
    <div>
      {editor && (
        <>
          {/* <FloatingContainer editor={editor} /> */}
          <BubbleMenu
            editor={editor}
            tippyOptions={{ zIndex: 20, maxWidth: 10000 }}
            className="bg-transparent"
          >
            <ToolsContainer editor={editor} />
          </BubbleMenu>
        </>
      )}
      <EditorContent spellCheck={false} editor={editor} />
      {/* {editor && (
        <div className="flex flex-col items-end mt-10">
          <p>
            {t("EDITOR.WORDS")} {editor.storage.characterCount.words()}
          </p>
          <p>
            {editor.storage.characterCount.characters()}/{limit}{" "}
            {t("EDITOR.CHARS")}
          </p>
        </div>
      )} */}
    </div>
  );
};
