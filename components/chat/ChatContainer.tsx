"use client";

import { NewMessageContainer } from "./newMessage/NewMessageContainer";

interface Props {
  workspaceId: string;
  chatId: string;
  // initialMessages: ExtendedMessage[];
  // sessionUserId: string;
  // workspaceName: string;
}

export const ChatContainer = ({ workspaceId, chatId }: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-between border border-border rounded-md shadow-sm relative">
      {/* <Header workspaceName={workspaceName} /> */}
      {/* <MessagesContainer
        chatId={chatId}
        workspaceId={workspaceId}
        sessionUserId={sessionUserId}
      /> */}
      <NewMessageContainer chatId={chatId} workspaceId={workspaceId} />
    </div>
  );
};
