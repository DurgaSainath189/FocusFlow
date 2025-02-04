import { AddTaskShortcut } from "@/components/addTaskShortCut/AddTaskShortcut";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import {
  getUserWorkspaceRole,
  getWorkspace,
} from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { FilterByUsersAndTagsInWorkspaceProvider } from "@/context/FilterByUsersAndTagsInWorkspace";
import { LeaveWorkspace } from "@/components/leaveWorkspace/LeaveWorkspace";
import { ShortcutContainer } from "@/components/workSpaceMainPage/shortcuts/ShortcutContainer";
import { FilterContainer } from "@/components/workSpaceMainPage/filter/FilterContainer";
import { PermissionIndicator } from "@/components/permissionIndicator/PermissionIndicator";

interface Params {
  params: {
    workspace_id: string;
  };
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}`
  );

  const [workspace, userRole] = await Promise.all([
    getWorkspace(workspace_id, session.user.id),
    getUserWorkspaceRole(workspace_id, session.user.id),
  ]);
  return (
    <FilterByUsersAndTagsInWorkspaceProvider>
      <DashboardHeader
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: workspace.name,
            href: `/dashboard/workspace/${workspace_id}`,
          },
        ]}
      >
        <PermissionIndicator
          userRole={userRole}
          workspaceName={workspace.name}
        />
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
        <AddTaskShortcut userId={session.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2 h-full">
        <ShortcutContainer workspace={workspace} userRole={userRole} />
        <FilterContainer sessionUserId={session.user.id} />
      </main>
    </FilterByUsersAndTagsInWorkspaceProvider>
  );
};

export default Workspace;
