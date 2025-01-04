import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { WorkspaceTab } from "@/components/settings/workspace/WorkspaceTab";
import { getWorkspaceSettings } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { subscribe } from "diagnostics_channel";

interface Params {
  params: {
    workspace_id: string;
  };
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/settings/workplace/${workspace_id}`
  );
  const workspace = await getWorkspaceSettings(workspace_id, session.user.id);
  const user = workspace.subscribers.find(
    (subscriber) => subscriber.user.id === session.user.id
  );

  return (
    <>
      <DashboardHeader
        className="mb-2 sm:mb-0"
        addManualRoutes={[
          {
            name: "Dashboard",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: "Settings",
            href: "/dashboard/settings",
          },
          {
            name: workspace.name,
            href: "/",
          },
        ]}
      >
        {(user?.userRole === "ADMIN" || user?.userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
      </DashboardHeader>
      <main className="flex flex-col gap-2">
        <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
      </main>
    </>
  );
};

export default Workspace;
