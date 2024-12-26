"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { te, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

export function TaskCalendar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size={"sm"}
            variant={"outline"}
            className={cn(
              "w-fit h-fit text-xs justify-start text-left font-normalnpx-2.5 py-0.5",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon size={16} className="mr-2 w-3 h-3" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL y", {
                    locale: enUS,
                  })}{" "}
                  -{" "}
                  {format(date.to, "dd LLL y", {
                    locale: enUS,
                  })}
                </>
              ) : (
                format(date.from, "dd LLL y", {
                  locale: enUS,
                })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            locale={enUS}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
