import { getAuthSession } from "@/lib/auth";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { User } from "./User";
import { OpenSidebar } from "./OpenSidebar";
import Welcoming from "../common/Welcoming";
import { cn } from "@/lib/utils";
import { SavingStatus } from "./SavingStatus";

interface Props {
  addManualRoutes?: {
    name: string;
    href: string;
    useTranslate?: boolean;
    emoji?: string;
  }[];
  className?: string;
  children?: React.ReactNode;
  workspaceHref?: string;
  hideBreadCrumb?: boolean;
  showingSavingStatus?: boolean;
}

export const DashboardHeader = async ({
  addManualRoutes,
  className,
  children,
  workspaceHref,
  hideBreadCrumb,
  showingSavingStatus,
}: Props) => {
  const session = await getAuthSession();
  if (!session) return null;
  return (
    <header
      className={cn(
        "flex w-full justify-between items-center mb-4 py-2 gap-2",
        className
      )}
    >
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
        {!showingSavingStatus && <SavingStatus />}
        {!hideBreadCrumb && (
          <BreadcrumbNav
            addManualRoutes={addManualRoutes}
            workspaceHref={workspaceHref}
          />
        )}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {children}
        <User
          profileImage={session?.user.image}
          username={session.user.username!}
          email={session.user.email!}
        />
      </div>
    </header>
  );
};
