import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CommandTagItem } from "./CommandTagItem";
import { NewTag } from "./NewTag";
import { EditTag } from "./EditTag";
import { Tag } from "@prisma/client";

interface Props {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void;
  workspaceId: string;
}

export const CommandContainer = ({
  tags,
  currentActiveTags,
  onSelectActiveTag,
  workspaceId,
}: Props) => {
  const [tab, setTab] = useState<"list" | "newTag" | "editTag">("list");
  const t = useTranslations("TASK.HEADER.TAG");

  const onSetTab = (tab: "list" | "newTag" | "editTag") => {
    setTab(tab);
  };
  return (
    <Command className="w-[15rem]">
      {tab === "list" && (
        <>
          <CommandInput className="text-xs" placeholder={t("FILTER")} />
          <CommandList>
            <CommandEmpty>{t("NOT_FOUND")}</CommandEmpty>
            <CommandGroup heading={t("TAGS_HEADING")}>
              {tags?.map((tag) => (
                <CommandTagItem
                  key={tag.id}
                  tag={tag}
                  currentActiveTags={currentActiveTags}
                  onSelectActiveTag={onSelectActiveTag}
                  // onEditTagInfo={onEditTagInfoHandler}
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t("NEW_HEADING")}>
              <CommandItem className="p-0">
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="w-full h-fit justify-start px-2 py-1.5 text-xs"
                  onClick={() => {
                    setTab("newTag");
                  }}
                >
                  <Plus className="mr-1" size={16} />
                  {t("ADD_TAG")}
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </>
      )}
      {tab === "newTag" && (
        <NewTag onSetTab={onSetTab} workspaceId={workspaceId} />
      )}
      {tab === "editTag" && <EditTag />}
    </Command>
  );
};
