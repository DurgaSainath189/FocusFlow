import { BreadcrumbNav } from "./BreadcrumbNav";
import { User } from "./User";
import { Welcoming } from "./Welcoming";

export const DashboardHeader = () => {
  return (
    <header className="flex w-full justify-between items-center mb-10">
      <Welcoming />
      <BreadcrumbNav />
      <User />
    </header>
  );
};
