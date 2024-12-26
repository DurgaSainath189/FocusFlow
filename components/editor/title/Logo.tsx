"use client";

import { EmojiSelector } from "@/components/common/EmojiSelector";
import { useState } from "react";

export const Logo = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("🧠");
  const selectEmojiHandler = (emoji: string) => {
    setSelectedEmoji(emoji);
  };
  return (
    <EmojiSelector onSelectedEmoji={selectEmojiHandler}>
      <span
        role="img"
        aria-label="emoji"
        className="w-16 h-16 rounded-lg bg-secondary flex justify-center items-center"
      >
        {selectedEmoji}
      </span>
    </EmojiSelector>
  );
};
