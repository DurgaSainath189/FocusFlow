"use client";

import { CustomColors, Tag } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
import { EditorTasks } from "../editor/Editor";
import { TagSelector } from "../tag/tagSelector/TagSelector";
import { LinkTag } from "../tag/LinkTag";
import { TaskCalendar } from "./TaskCalendar";
import { Emoji } from "./Emoji";
import { useTranslations } from "next-intl";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useSaveTaskState } from "@/context/SaveTaskState";
import axios from "axios";

interface Props {
  workspaceId: string;
  initialActiveTags: Tag[];
  taskId: string;
  title?: string;
  content?: JSON;
  emoji?: string;
  from?: Date;
  to?: Date;
}

export const TaskContainer = ({
  workspaceId,
  initialActiveTags,
  taskId,
  title,
  content,
  emoji,
  from,
  to,
}: Props) => {
  const [currentActiveTags, setCurrentActiveTags] = useState(initialActiveTags);
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("TASK");

  const { status, onSetStatus } = useSaveTaskState();

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      icon: emoji ? emoji : "📒",
      title: title ? title : "",
    },
  });

  const { data: tags, isLoading } = useQuery({
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
    if (status !== "unsaved") onSetStatus("unsaved");
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
    debouncedCurrentActiveTags();
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

  const onDeleteActiveTagHandler = (tagId: string) => {
    if (status !== "unsaved") onSetStatus("unsaved");
    setCurrentActiveTags((prevActiveTags) => {
      if (prevActiveTags.length === 0) return prevActiveTags;
      const updatedTags = prevActiveTags.filter((tag) => tag.id !== tag.id);
      return updatedTags;
    });
    debouncedCurrentActiveTags();
  };

  const { mutate: updateTaskTitle, isPending } = useMutation({
    mutationFn: async (title: string) => {
      await axios.post("/api/task/update/title", {
        workspaceId,
        title,
        taskId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const { mutate: updateTaskActiveTags } = useMutation({
    mutationFn: async (tagIds: string[]) => {
      await axios.post("/api/task/update/active_tags", {
        workspaceId,
        tagsIds: tagIds,
        taskId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const debouncedTitle = useDebouncedCallback(
    useCallback((value: string) => {
      onSetStatus("pending");
      updateTaskTitle(value);
    }, []),
    2000
  );

  const debouncedCurrentActiveTags = useDebouncedCallback(() => {
    onSetStatus("pending");
    const tagsIds = currentActiveTags.map((tag) => tag.id);
    updateTaskActiveTags(tagsIds);
  }, 2000);

  const onSubmit = (data: TaskSchema) => {};

  return (
    <Card>
      <form id="task-form">
        <CardContent className="py-4 sm:py-6 flex flex-col gap-10">
          <div className="w-full flex item-start gap-2 sm:gap-4">
            <Emoji
              emoji={emoji ? emoji : "📒"}
              taskId={taskId}
              workspaceId={workspaceId}
              onFormSelect={onFormSelectHandler}
            />
            <div className="w-full flex flex-col gap-2">
              <TextareaAutosize
                {...rest}
                ref={(e) => {
                  titleRef(e);
                  //@ts-ignore
                  _titleRef.current = e;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                onChange={(e) => {
                  if (status !== "unsaved") onSetStatus("unsaved");
                  debouncedTitle(e.target.value);
                }}
                placeholder={t("HEADER.PLACEHOLDER")}
                className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none"
              />
              <div className="w-full gap-1 flex flex-wrap flex-row">
                <TaskCalendar
                  onUpdateForm={onUpdateFormHandler}
                  workspaceId={workspaceId}
                  taskId={taskId}
                  from={from}
                  to={to}
                />
                <TagSelector
                  isLoading={isLoading}
                  tags={tags}
                  currentActiveTags={currentActiveTags}
                  onSelectActiveTag={onSelectActiveTagHandler}
                  workspaceId={workspaceId}
                  onUpdateActiveTags={onUpdatActiveTagHandler}
                  onDeleteActiveTag={onDeleteActiveTagHandler}
                />
                {currentActiveTags.map((tag) => (
                  <LinkTag key={tag.id} tag={tag} disabled />
                ))}
              </div>
            </div>
          </div>
          <EditorTasks
            workspaceId={workspaceId}
            taskId={taskId}
            content={content}
          />
        </CardContent>
      </form>
    </Card>
  );
};
