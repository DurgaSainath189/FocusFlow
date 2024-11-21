import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const Onboarding = async () => {
  const session = await checkIfUserCompletedOnboarding("/onboarding");
  console.log(session);

  return <div>Onboarding</div>;
};

export default Onboarding;
