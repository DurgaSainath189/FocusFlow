import { AddTaskShortcut } from "@/components/addTaskShortCut/AddTaskShortcut";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { getUserWorkspaceRole, getWorkspaceWithChatId } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { FilterByUsersAndTagsInWorkspaceProvider } from "@/context/FilterByUsersAndTagsInWorkspace";
import { LeaveWorkspace } from "@/components/leaveWorkspace/LeaveWorkspace";
import { ShortcutContainer } from "@/components/workSpaceMainPage/shortcuts/ShortcutContainer";
import { FilterContainer } from "@/components/workSpaceMainPage/filter/FilterContainer";
import { RecentActivityContainer } from "@/components/workSpaceMainPage/recentActivity/RecentActivityContainer";
import { notFound } from "next/navigation";

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
    getWorkspaceWithChatId(workspace_id, session.user.id),
    getUserWorkspaceRole(workspace_id, session.user.id),
  ]);

  if (!workspace || !userRole) notFound();
  
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
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />}
        <AddTaskShortcut userId={session.user.id} />
      </DashboardHeader>
      <main className="flex flex-col gap-2 h-full">
        <ShortcutContainer workspace={workspace} userRole={userRole} />
        <FilterContainer sessionUserId={session.user.id} />
        <RecentActivityContainer
          userId={session.user.id}
          workspaceId={workspace.id}
        />
      </main>
    </FilterByUsersAndTagsInWorkspaceProvider>
  );
};

export default Workspace;
