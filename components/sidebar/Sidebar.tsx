import { OptionsSidebar } from "./optionsSidebar/OptionsSidebar";
import { ShortcutSidebar } from "./shortcutSidebar/ShortcutSidebar";

export const Sidebar = () => {
  return (
    <aside className="fixed z-50 top-0 left-0 lg:static bg-background border-r h-full flex overflow-hidden">
      <ShortcutSidebar />
      <OptionsSidebar />
    </aside>
  );
};
