"use client";

import { CustomColors, Tag } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { Container } from "./container/Container";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "./Logo";
import TextareaAutosize from "react-textarea-autosize";
import { DateRange } from "react-day-picker";
import { TaskCalendar } from "./TaskCalendar";
import { TagSelector } from "../common/tag/tagSelector/TagSelector";
import { LinkTag } from "../common/tag/LinkTag";

interface Props {
  workspaceId: string;
  initialActiveTags: Tag[];
}

export const Editor = ({ workspaceId, initialActiveTags }: Props) => {
  const [currentActiveTags, setCurrentActiveTags] = useState(initialActiveTags);
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      icon: "🧠",
      title: "",
      content: null,
      date: null,
    },
  });

  const { data: tags } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`
      );

      if (!res.ok) return [];

      const data = await res.json();

      return data as Tag[];
    },
    enabled: isMounted,
    queryKey: ["getWorkspaceTags"],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { ref: titleRef, ...rest } = form.register("title");

  const onFormSelectHandler = (emoji: string) => {
    form.setValue("icon", emoji);
  };

  const onUpdateFormHandler = (date: DateRange | undefined) => {
    form.setValue("date", date);
  };

  const onSelectActiveTagHandler = (tagId: string) => {
    setCurrentActiveTags((prevActiveTags) => {
      const tagIndex = prevActiveTags.findIndex(
        (activeTag) => activeTag.id === tagId
      );

      if (tagIndex !== -1) {
        const updatedActiveTags = [...prevActiveTags];
        updatedActiveTags.splice(tagIndex, 1);
        return updatedActiveTags;
      } else {
        const selectedTag = tags!.find((tag) => tag.id === tagId);
        if (selectedTag) {
          return [...prevActiveTags, selectedTag];
        }
      }
      return prevActiveTags;
    });
  };

  const onUpdatActiveTagHandler = (
    tagId: string,
    color: CustomColors,
    name: string
  ) => {
    setCurrentActiveTags((prevActiveTags) => {
      const updatedTags = prevActiveTags.map((tag) =>
        tag.id === tag.id ? { ...tag, name, color } : tag
      );
      return updatedTags;
    });
  };

  const onSubmit = (data: TaskSchema) => {};

  return (
    <Card>
      <form id="task-form" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="py-4 sm:py-6">
          <div className="w-full flex item-start gap-2 sm:gap-4">
            <Logo onFormSelect={onFormSelectHandler} />
            <div className="w-full flex flex-col gap-2">
              <TextareaAutosize
                ref={(e) => {
                  titleRef(e);
                  //@ts-ignore
                  _titleRef.current = e;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                {...rest}
                placeholder="Some text here"
                className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none"
              />
              <div className="w-full gap-1 flex flex-wrap flex-row">
                <TaskCalendar onUpdateForm={onUpdateFormHandler} />
                <TagSelector
                  tags={tags}
                  currentActiveTags={currentActiveTags}
                  onSelectActiveTag={onSelectActiveTagHandler}
                  workspaceId={workspaceId}
                  onUpdateActiveTags={onUpdatActiveTagHandler}
                />
                {currentActiveTags.map((tag) => (
                  <LinkTag key={tag.id} tag={tag} disabled />
                ))}
              </div>
            </div>
          </div>
          <Container />
        </CardContent>
        <button type="submit">button</button>
      </form>
    </Card>
  );
};
