"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { CommandContainer } from "./CommandContainer";
import { CustomColors, Tag } from "@prisma/client";
import { LoadingState } from "@/components/ui/loadingState";
import { useRouter } from "next-intl/client";

interface Props {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void;
  workspaceId: string;
  onUpdateActiveTags: (
    tagId: string,
    color: CustomColors,
    name: string
  ) => void;
  isLoading: boolean;
  onDeleteActiveTag: (tagId: string) => void;
}

export const TagSelector = ({
  tags,
  currentActiveTags,
  onSelectActiveTag,
  workspaceId,
  onUpdateActiveTags,
  isLoading,
  onDeleteActiveTag,
}: Props) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5"
          variant={"outline"}
          size={"sm"}
        >
          <Plus size={16} className="" />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isLoading && (
          <div className="p-3 flex justify-center items-center">
            <LoadingState />
          </div>
        )}
        {!isLoading && tags ? (
          <CommandContainer
            tags={tags}
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
          />
        ) : (
          <div className="p-3 text-sm flex justify-center items-center flex-col gap-4">
            <p>Oops, something went wrong</p>
            <Button
              onClick={() => router.refresh()}
              className="w-full"
              size={"sm"}
              variant={"default"}
            >
              Refresh
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
