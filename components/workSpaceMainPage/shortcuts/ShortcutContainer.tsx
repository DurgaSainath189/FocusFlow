"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPermission } from "@prisma/client";
import { MessagesSquare, PencilRuler, Workflow } from "lucide-react";
import { ShortcutContainerLinkItem } from "./ShortcutContainerLinkItem";
import { ExtendedWorkspace } from "@/types/extended";
import { ShortcutContainerBtnItem } from "./ShortcutContainerBtnItem";
import { LeaveWorkspace } from "../../leaveWorkspace/LeaveWorkspace";
import { PermissionIndicator } from "@/components/permissionIndicator/PermissionIndicator";
import { useNewTask } from "@/hooks/useNewTask";
import { useNewMindMap } from "@/hooks/useNewMindMap";

interface Props {
  workspace: ExtendedWorkspace;
  userRole: UserPermission | null;
}

export const ShortcutContainer = ({ workspace, userRole }: Props) => {
  const { newTask, isPending: isNewTaskLoading } = useNewTask(workspace.id);
  const { newMindMap, isPending: isNewMindMapLoading } = useNewMindMap(
    workspace.id
  );
  return (
    <ScrollArea className="w-full">
      <div className="flex w-max space-x-4 pb-4 mt-4">
        {/* <PermissionIndicator
          userRole={userRole}
          workspaceName={workspace.name}
        /> */}
        <ShortcutContainerLinkItem
          userRole={userRole}
          Icon={MessagesSquare}
          title="Group chat"
          //   href={`/dashboard/workspace/${workspace.id}/chat/${workspace.conversation.id}`}
          href={"/"}
        />
        <ShortcutContainerBtnItem
          userRole={userRole}
          Icon={PencilRuler}
          title="New task"
          isLoading={isNewTaskLoading}
          onClick={newTask}
        />
        <ShortcutContainerBtnItem
          userRole={userRole}
          Icon={Workflow}
          title="New mind map"
          isLoading={isNewMindMapLoading}
          onClick={newMindMap}
        />
        {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
      </div>
    </ScrollArea>
  );
};
