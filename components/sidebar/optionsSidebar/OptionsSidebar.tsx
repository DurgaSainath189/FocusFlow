"use client";

import { usePathname } from "next-intl/client";
import { CreatedWorkspacesInfo } from "@/components/common/CreatedWorkspacesInfo";
import { Workspace } from "@prisma/client";
import { WorkspaceOptions } from "./workspaceOptions/WorkspaceOptions";
import { Settings } from "./settingsOptions/Settings";

interface Props {
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
  // userWorkspaces: Workspace[];
}

export const OptionsSidebar = ({
  createdWorkspaces,
  userAdminWorkspaces,
}: // userWorkspaces,
Props) => {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;

  const urlWorkspaceId: string | undefined = pathname.split("/")[3];
  const urlAdditionalId: string | undefined = pathname.split("/")[6];
  const workspaceId = urlWorkspaceId ? urlWorkspaceId : "";

  if (
    pathname === "/dashboard" ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}/edit`) ||
    (urlAdditionalId &&
      pathname ===
        `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}/edit`)
  ) {
    return null;
  }
  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between">
      {pathname.includes("/dashboard/settings") && (
        <Settings userAdminWorkspaces={userAdminWorkspaces} />
      )}

      {(pathname === `/dashboard/workspace/${workspaceId}` ||
        pathname ===
          `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` ||
        pathname ===
          `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}`) && (
        <WorkspaceOptions workspaceId={workspaceId} />
      )}
      <CreatedWorkspacesInfo createdNumber={createdWorkspaces} />
    </div>
  );
};
