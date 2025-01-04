"use client";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next-intl/client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Task } from "@prisma/client";

interface Props {
  workspaceId: string;
}

export const NewTask = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
  const m = useTranslations("MESSAGES");

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: newTask, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/task/new`, {
        workspaceId,
      });

      return data;
    },
    onSuccess: (data: Task) => {
      toast({
        title: m("SUCCES.TASK_ADDED"),
      });
      router.push(
        `/dashboard/workspace/${workspaceId}/tasks/task/${data.id}/edit`
      );
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    mutationKey: ["newTask"],
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newTask();
      }}
      className="justify-start items-center gap-2"
      variant="ghost"
      size="sm"
    >
      <Plus size={16} />
      {isPending ? <LoadingState /> : t("ADD_TASK")}
    </Button>
  );
};
