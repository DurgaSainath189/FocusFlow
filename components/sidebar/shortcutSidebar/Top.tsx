"use client";

import ActiveLink from "@/components/ui/active-link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BrainCircuit, CalendarDays, Home } from "lucide-react";
import { useTranslations } from "next-intl";

export const Top = () => {
  const t = useTranslations("SIDEBAR");
  return (
    <div className="flex flex-col gap-4 items-center">
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <ActiveLink variant={"ghost"} size={"icon"} href={"/dashboard"}>
            <Home />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t("MAIN.HOME_HOVER")}</span>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <ActiveLink
            include="pomodoro"
            variant={"ghost"}
            size={"icon"}
            href={"/dashboard/pomodoro"}
          >
            <BrainCircuit />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>Pomodoro</span>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <ActiveLink
            variant={"ghost"}
            size={"icon"}
            href={"/dashboard/calendar"}
          >
            <CalendarDays />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>Calendar</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
