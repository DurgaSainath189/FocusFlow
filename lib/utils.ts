import { clsx, type ClassValue } from "clsx";
import { CalendarDays, Clock, Home, Star, User } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathsToSoundEffects = {
  ANALOG: "/music/analog.mp3",
  BELL: "/music/bell.mp3",
  BIRD: "/music/bird.mp3",
  CHURCH_BELL: "/music/churchBell.mp3",
  DIGITAL: "/music/digital.mp3",
  FANCY: "/music/fancy.mp3",
} as const;

export const topSidebarLinks = [
  {
    href: "/dashboard",
    Icon: Home,
    hoverTextKey: "HOME_HOVER",
  },
  {
    href: "/dashboard/pomodoro",
    include: "/dashboard/pomodoro",
    Icon: Clock,
    hoverTextKey: "POMODORO_HOVER",
  },
  {
    href: "/dashboard/calendar",
    Icon: CalendarDays,
    hoverTextKey: "CALENDAR_HOVER",
  },
  {
    href: "/dashboard/starred",
    Icon: Star,
    hoverTextKey: "STARRED_HOVER",
  },
  {
    href: "/dashboard/assigned-to-me",
    Icon: User,
    hoverTextKey: "ASSIGNED_TO_ME_HOVER",
  },
];
