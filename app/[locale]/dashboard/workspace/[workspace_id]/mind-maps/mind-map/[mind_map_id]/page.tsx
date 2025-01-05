import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { MindMap } from "@/components/mindMaps/MindMap";
import { AutosaveIndicatorProvider } from "@/context/AutosaveIndicator";
import { AutoSaveMindMapProvider } from "@/context/AutoSaveMindMap";
import { getMindMap, getUserWorkspaceRole, getWorkspace } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

interface Params {
  params: {
    workspace_id: string;
    mind_map_id: string;
  };
}

const MindMapPage = async ({
  params: { workspace_id, mind_map_id },
}: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}`
  );

  const [workspace, userRole, mindMap] = await Promise.all([
    getWorkspace(workspace_id, session.user.id),
    getUserWorkspaceRole(workspace_id, session.user.id),
    getMindMap(mind_map_id, session.user.id),
  ]);

  const canEdit = userRole === "ADMIN" || userRole === "OWNER" ? true : false;

  return (
    <AutosaveIndicatorProvider>
      <AutoSaveMindMapProvider>
        <DashboardHeader
          addManualRoutes={[
            {
              name: "DASHBOARD",
              href: `/dashboard`,
              useTranslate: true,
            },
            {
              name: workspace.name,
              href: `/dashboard/workspace/${workspace_id}`,
            },
            {
              name: `${mindMap.title ? mindMap.title : "UNTITLED"}`,
              href: "/",
              useTranslate: mindMap.title ? false : true,
            },
          ]}
          hideBreadCrumb
          showingSavingStatus
          showBackBtn
        >
          {canEdit && <InviteUsers workspace={workspace} />}
        </DashboardHeader>
        <main className="flex flex-col gap-2 h-full">
          <MindMap
            initialInfo={mindMap}
            workspaceId={workspace_id}
            canEdit={false}
            initialActiveTags={mindMap.tags}
          />
        </main>
      </AutoSaveMindMapProvider>{" "}
    </AutosaveIndicatorProvider>
  );
};

export default MindMapPage;
