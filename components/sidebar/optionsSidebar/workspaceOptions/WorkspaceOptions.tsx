"use client";

import ActiveLink from "@/components/ui/active-link";
import { Brain, CalendarRange, Files, Map, PencilRuler } from "lucide-react";
import { useTranslations } from "next-intl";
import { NewTask } from "./actions/NewTask";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceShortcuts } from "@/types/extended";
import { WorkspaceOption } from "./WorkspaceOption";
import { NewMindMap } from "./actions/NewMindMap";

interface Props {
  workspaceId: string;
}

export const WorkspaceOptions = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");

  const { data: workspaceShortcuts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data as WorkspaceShortcuts;
    },
    queryKey: ["getWorkspaceShortcuts", workspaceId],
  });
  return (
    <div>
      <div>
        <p className="text-xs sm:text-sm upppercase text-muted-foreground">
          {t("SHORTCUTS")}
        </p>
        {!isLoading && workspaceShortcuts && (
          <div>
            <WorkspaceOption
              workspaceId={workspaceId}
              href={`tasks/task`}
              fields={workspaceShortcuts.tasks}
              defaultName="Task"
            >
              <PencilRuler size={16} />
              {t("TASKS")}
            </WorkspaceOption>
            <WorkspaceOption
              workspaceId={workspaceId}
              href={`mind-maps/mind-map`}
              fields={workspaceShortcuts.mindMaps}
              defaultName={t("DEFAULT_NAME")}
            >
              <Map size={16} />
              {t("MIND_MAPS")}
            </WorkspaceOption>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("ACTIONS")}
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          <NewTask workspaceId={workspaceId} />
          <NewMindMap workspaceId={workspaceId} />
        </div>
      </div>
    </div>
  );
};
