import { Workspace } from "@prisma/client";
import { Top } from "./Top";
import { Bottom } from "./Bottom";
import { AddWorkspace } from "./newWorkspace/AddWorkspace";
import { Workspaces } from "./workspaces/Workspaces";

interface Props {
  userWorkspaces: Workspace[];
  // createdWorkspaces: number;
}

export const ShortcutSidebar = ({ userWorkspaces }: Props) => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <div className="w-full h-2/3 space-y-4">
        <Top />
        <Workspaces userWorkspaces={userWorkspaces} />
        <AddWorkspace activeWorkspaces={userWorkspaces.length} />
      </div>
      <Bottom />
    </div>
  );
};
