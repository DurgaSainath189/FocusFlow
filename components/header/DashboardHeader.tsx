import { getAuthSession } from "@/lib/auth";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { User } from "./User";
import { OpenSidebar } from "./OpenSidebar";
import Welcoming from "../common/Welcoming";

interface Props {
  addManualRoutes?: string[];
}

export const DashboardHeader = async ({ addManualRoutes }: Props) => {
  const session = await getAuthSession();
  if (!session) return null;
  return (
    <header className="flex w-full justify-between items-center mb-4 py-2 gap-2">
      <div className="flex items-center gap-2">
        <OpenSidebar />
        <Welcoming
          hideOnMobile
          hideOnDesktop
          username={session?.user.username!}
          name={session?.user.name}
          surname={session?.user.surname}
          showOnlyOnPath="/dashboard"
        />
        <BreadcrumbNav addManualRoutes={addManualRoutes} />
      </div>
      <User profileImage={session?.user.image} />
    </header>
  );
};
