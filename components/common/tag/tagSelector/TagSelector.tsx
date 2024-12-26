"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { CommandContainer } from "./CommandContainer";

export const TagSelector = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 text-muted-foreground"
          variant={"outline"}
          size={"sm"}
        >
          <Plus size={16} className="" />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <CommandContainer />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
