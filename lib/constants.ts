import {
  CalendarDays,
  Clock,
  MessageSquare,
  PencilRuler,
  Workflow,
} from "lucide-react";

export const ACTIVITY_PER_PAGE = 8;
export const MESSAGES_LIMIT = 30;

export const homePageHeaderLinks = [
  {
    href: "Tasks",
    Icon: PencilRuler,
    title: "Tasks & Notes",
  },
  {
    href: "Mind-Maps",
    Icon: Workflow,
    title: "Mind Maps",
  },
  {
    href: "Calendar",
    Icon: CalendarDays,
    title: "Calendar",
  },
  {
    href: "Chat",
    Icon: MessageSquare,
    title: "Group Chat",
  },
  {
    href: "Pomodoro",
    Icon: Clock,
    title: "Pomodoro",
  },
];
