"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { te, enUS, hi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { useLocale, useTranslations } from "next-intl";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";

interface Props {
  onUpdateForm: (e: DateRange | undefined) => void;
}

export function TaskCalendar({
  className,
  onUpdateForm,
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const t = useTranslations("TASK.HEADER.DATE");
  const lang = useLocale();
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const currentLocale = useMemo(() => {
    if (lang === "te") return te;
    else if (lang === "hi") return hi;
    else return enUS;
  }, [lang]);

  const onSelectDateChange = (date: DateRange | undefined) => {
    setDate(date);
    onUpdateForm(date);
  };
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger>
          <Info size={16} className="w-4 h-4" />
        </HoverCardTrigger>
        <HoverCardContent align="start">{t("INFO")}</HoverCardContent>
      </HoverCard>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size={"sm"}
            variant={"outline"}
            className={cn(
              "w-fit h-fit text-xs justify-start text-left font-normalnpx-2.5 py-0.5"
            )}
          >
            <CalendarIcon size={16} className="mr-2 w-3 h-3" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y", {
                    locale: currentLocale,
                  })}{" "}
                  -{" "}
                  {format(date.to, "dd LLL y", {
                    locale: currentLocale,
                  })}
                </>
              ) : (
                format(date.from, "dd LLL y", {
                  locale: currentLocale,
                })
              )
            ) : (
              <span>{t("PICK")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelectDateChange}
            locale={currentLocale}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
