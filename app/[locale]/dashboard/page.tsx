import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const DashBoard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard");
  console.log(session);

  return <div>Dashboard</div>;
};

export default DashBoard;
