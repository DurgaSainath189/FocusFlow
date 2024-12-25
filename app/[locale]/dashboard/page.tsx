import Welcoming from "@/components/common/Welcoming";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const DashBoard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");
  console.log(session);

  return (
    <>
      <DashboardHeader />
      <main>
        <Welcoming
          hideOnDesktop
          className="px-4 py-2"
          username={session?.user.username!}
          name={session?.user.name}
          surname={session?.user.surname}
        />
      </main>
    </>
  );
};

export default DashBoard;
