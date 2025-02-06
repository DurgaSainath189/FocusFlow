import { HomePageImage } from "@/types/extended";
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

export const homePageHeaderImgs: HomePageImage[] = [
  {
    src: "/images/dashboardBlack.png",
    alt: "Home page - dark theme",
  },
  {
    src: "/images/dashboardWhite.png",
    alt: "Home page - light theme",
  },
  {
    src: "/images/workspaceMainPage.png",
    alt: "Workspace main page - dark theme",
  },
  {
    src: "/images/workspaceMainPageFiltersBlack.png",
    alt: "Workspace main page - dark theme",
  },
  {
    src: "/images/workspaceMainPageFiltersWhite.png",
    alt: "Workspace main page - light theme",
  },
];
