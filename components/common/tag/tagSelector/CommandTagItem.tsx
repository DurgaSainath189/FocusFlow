import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { Check, Tag } from "lucide-react";
import { CustomColors, Tag as TagType } from "@prisma/client";
import { useMemo } from "react";

interface Props {
  tag: TagType;
  currentActiveTags: TagType[];
  onSelectActiveTag: (id: string) => void;
}

export const CommandTagItem = ({
  tag: { color, id, name, workspaceId },
  currentActiveTags,
  onSelectActiveTag,
}: Props) => {
  const isActive = useMemo(() => {
    return (
      currentActiveTags.length > 0 &&
      currentActiveTags.find((activeTag) => activeTag.id === id)
    );
  }, [currentActiveTags, id]);

  const tagColor = useMemo(() => {
    switch (color) {
      case CustomColors.BLUE:
        return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";
      case CustomColors.EMERALD:
        return "bg-emerald-600 hover:bg-emerald-500 border-emerald-600 hover:border-emerald-500";
      case CustomColors.LIME:
        return "bg-lime-600 hover:bg-lime-500 border-lime-600 hover:border-lime-500";
      case CustomColors.ORANGE:
        return "bg-orange-600 hover:bg-orange-500 border-orange-600 hover:border-orange-500";
      case CustomColors.PINK:
        return "bg-pink-600 hover:bg-pink-500 border-pink-600 hover:border-pink-500";
      case CustomColors.YELLOW:
        return "bg-yellow-600 hover:bg-yellow-500 border-yellow-600 hover:border-yellow-500";
      case CustomColors.RED:
        return "bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500";
      case CustomColors.PURPLE:
        return "bg-purple-600 hover:bg-purple-500 border-purple-600 hover:border-purple-500";
      case CustomColors.GREEN:
        return "bg-green-600 hover:bg-green-500 border-green-600 hover:border-green-500";
      case CustomColors.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500 border-cyan-600 hover:border-cyan-500";
      case CustomColors.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500";
      case CustomColors.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuchsia-500 border-fuchsia-600 hover:border-fuchsia-500";
      default:
        return "bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500";
    }
  }, [color]);
  return (
    <CommandItem className="p-0">
      <Button
        onClick={() => {
          onSelectActiveTag(id);
        }}
        size={"sm"}
        variant={"ghost"}
        className={`w-full h-fit justify-start px-2 py-1.5 text-xs ${tagColor}`}
      >
        <p className="flex">
          <Tag className="mr-2" size={16} />
          <span className="text-secondary-foreground">{name}</span>
        </p>
        {isActive && <Check size={16} />}
      </Button>
    </CommandItem>
  );
};
