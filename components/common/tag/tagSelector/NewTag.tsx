"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Warning from "@/components/ui/warning";
import { colors } from "@/lib/getRandomWorkspaceColor";
import { tagSchema, TagSchema } from "@/schema/tagSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomColors } from "@prisma/client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSetTab: (tab: "list" | "newTag" | "editTag") => void;
}

export const NewTag = ({ onSetTab }: Props) => {
  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      tagName: "",
      color: "RED",
      id: uuidv4(),
    },
  });
  const tagColor = (providedColor: CustomColors) => {
    switch (providedColor) {
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
  };

  const onSubmit = async (data: TagSchema) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[15rem] p-3 space-y-6"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="tagName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-muted h-7 py-1.5 text-sm"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-muted-foreground">
                    Colors
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2 md:gap-3"
                    >
                      {colors.map((color) => (
                        <FormItem
                          key={color}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={color}
                              //@ts-ignore
                              useCheckIcon
                              className={`transition-colors duration-200 ${tagColor(
                                color
                              )}`}
                            ></RadioGroupItem>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              onSetTab("list");
            }}
            type="button"
            className="w-1/2 h-fit py-1.5"
            variant={"secondary"}
            size={"sm"}
          >
            Cancel
          </Button>
          <Button
            className="w-1/2 h-fit py-1.5 dark:text-white"
            size={"sm"}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
