import { TagSelector } from "@/components/common/tag/tagSelector/TagSelector";
import { Logo } from "./Logo";
import { TaskCalendar } from "./TaskCalendar";
import { Title } from "./Title";
import { LinkTag } from "@/components/common/tag/LinkTag";

export const Header = () => {
  return (
    <div className="w-full flex items-start gap-2 sm:gap-4">
      <Logo />
      <div className="w-full flex flex-col gap-2">
        <Title />
        <div className="w-full flex gap-1 flex-wrap flex-row">
          <TaskCalendar />
          <TagSelector />
          <LinkTag />
        </div>
      </div>
    </div>
  );
};
