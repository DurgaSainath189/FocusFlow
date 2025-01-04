"use client";

import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface SaveTaskStateContext {
  status: "unsaved" | "saved" | "pending";
  onSetStatus: (status: "unsaved" | "saved" | "pending") => void;
}

export const SaveTaskStateCtx = createContext<SaveTaskStateContext | null>(
  null
);

export const SaveTaskStateProvider = ({ children }: Props) => {
  const [status, setStatus] = useState<"unsaved" | "saved" | "pending">(
    "saved"
  );

  const onSetStatus = (status: "unsaved" | "saved" | "pending") => {
    setStatus(status);
  };

  return (
    <SaveTaskStateCtx.Provider value={{ status, onSetStatus }}>
      {children}
    </SaveTaskStateCtx.Provider>
  );
};

export const useSaveTaskState = () => {
  const ctx = useContext(SaveTaskStateCtx);
  if (!ctx) throw new Error("invalid use");

  return ctx;
};
