"use client";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next-intl/client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { MindMap } from "@prisma/client";

interface Props {
  workspaceId: string;
}

export const NewMindMap = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
  const m = useTranslations("MESSAGES");

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: newMindMap, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/mind_maps/new`, {
        workspaceId,
      });

      return data;
    },
    onSuccess: (data: MindMap) => {
      toast({
        title: m("SUCCES.MIND_MAP_ADDED"),
      });
      router.push(
        `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${data.id}/edit`
      );
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    mutationKey: ["newMindMap"],
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newMindMap();
      }}
      className="justify-start items-center gap-2"
      variant="ghost"
      size="sm"
    >
      <Plus size={16} />
      {isPending ? (
        <LoadingState loadingText={t("ADD_MIND_MAP_PENDING")} />
      ) : (
        t("ADD_MIND_MAP")
      )}
    </Button>
  );
};
