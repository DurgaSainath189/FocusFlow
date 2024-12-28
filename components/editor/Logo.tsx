"use client";

import { EmojiSelector } from "@/components/common/EmojiSelector";
import { useState } from "react";

interface Props {
  onFormSelect: (emoji: string) => void;
}

export const Logo = ({ onFormSelect }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState("🧠");
  const selectEmojiHandler = (emoji: string) => {
    setSelectedEmoji(emoji);
    onFormSelect(emoji);
  };
  return (
    <EmojiSelector onSelectedEmoji={selectEmojiHandler}>
      <span
        role="img"
        aria-label="emoji"
        className="w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl"
      >
        {selectedEmoji}
      </span>
    </EmojiSelector>
  );
};
