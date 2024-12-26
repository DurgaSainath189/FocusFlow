"use client";

import { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

export const Title = () => {
  const [content, setContent] = useState("");

  const onChangeHandler = (e: ContentEditableEvent) => {
    setContent(e.target.value);
  };

  const onPasteHandler = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const plainText = event.clipboardData.getData("text/plain");
    setContent(plainText);
  };
  return (
    <div className="relative text-xl font-semibold">
      <ContentEditable
        tagName="spam"
        className="outline-none inline-block min-h-0 relative z-20 w-full break-words break-all"
        html={content}
        onChange={onChangeHandler}
        onPaste={onPasteHandler}
        spellCheck={false}
      />
      {!content && (
        <span className="text-muted-foreground pointer-events-none absolute left-0 top-0 min-h-0">
          No Content
        </span>
      )}
    </div>
  );
};
