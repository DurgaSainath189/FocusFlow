import { DashboardHeader } from "@/components/header/DashboardHeader";
import { getWorkspace } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";

interface Params {
  params: {
    workspace_id: string;
  };
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}`
  );

//   const workspace=await getWorkspace(workspace_name);
  return (
    <>
      <DashboardHeader />
    </>
  );
};

export default Workspace;
