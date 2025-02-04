import { AddTaskShortcut } from "@/components/addTaskShortCut/AddTaskShortcut";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { LeaveWorkspace } from "@/components/leaveWorkspace/LeaveWorkspace";
import { PermissionIndicator } from "@/components/permissionIndicator/PermissionIndicator";
import { TaskContainer } from "@/components/tasks/editable/container/TaskContainer";
import { AutosaveIndicatorProvider } from "@/context/AutosaveIndicator";
import { getTask, getUserWorkspaceRole, getWorkspace } from "@/lib/api";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { redirect } from "next-intl/server";

interface Params {
  params: {
    workspace_id: string;
    task_id: string;
  };
}

const EditTask = async ({ params: { workspace_id, task_id } }: Params) => {
  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}/tasks/task/${task_id}`
  );

  const [workspace, userRole, task] = await Promise.all([
    getWorkspace(workspace_id, session.user.id),
    getUserWorkspaceRole(workspace_id, session.user.id),
    getTask(task_id, session.user.id),
  ]);

  const canEdit =
    userRole === "ADMIN" || userRole === "OWNER" || userRole === "CAN_EDIT"
      ? true
      : false;
  if (!canEdit)
    redirect(`/dashboard/workspace/${workspace_id}/tasks/task/${task_id}`);

  return (
    <>
      <AutosaveIndicatorProvider>
        {" "}
        <DashboardHeader hideBreadCrumb showingSavingStatus showBackBtn>
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
        <main className="flex flex-col gap-2">
          <TaskContainer
            taskId={task_id}
            workspaceId={workspace_id}
            initialActiveTags={task.tags}
            title={task.title}
            content={task.content as unknown as JSON}
            emoji={task.emoji}
            from={task?.taskDate?.from}
            to={task?.taskDate?.to}
          />
        </main>
      </AutosaveIndicatorProvider>
    </>
  );
};

export default EditTask;
