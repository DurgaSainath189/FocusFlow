import { Workspace } from "@prisma/client";
import { Top } from "./Top";
import { Bottom } from "./Bottom";
import { Workspaces } from "./Workspaces";
import { AddWorkspace } from "./newWorkspace/AddWorkspace";

// interface Props {
//   userWorkspaces: Workspace[];
//   createdWorkspaces: number;
// }

export const ShortcutSidebar = () => {
  return (
    <div className="border-r h-full flex flex-col justify-between items-center p-4 sm:py-6">
      <div className="w-full h-2/3 space-y-4">
        <Top />
        <Workspaces />
        <AddWorkspace />
      </div>
      <Bottom />
    </div>
  );
};
