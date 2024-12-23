import Welcoming from "@/components/common/Welcoming";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const DashBoard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");
  console.log(session);

  return (
    <div>
      <Welcoming hideOnDesktop className="px-4 py-2" />
    </div>
  );
};

export default DashBoard;
