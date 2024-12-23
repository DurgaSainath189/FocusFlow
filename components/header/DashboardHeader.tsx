import { getAuthSession } from "@/lib/auth";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { User } from "./User";
import { Welcoming } from "./Welcoming";

export const DashboardHeader = async () => {
  const session = await getAuthSession();
  return (
    <header className="flex w-full justify-between items-center mb-10">
      <Welcoming />
      <BreadcrumbNav />
      <User profileImage={session?.user.image} />
    </header>
  );
};
