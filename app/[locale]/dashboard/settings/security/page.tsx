import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const SecuritySettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return <div>SecuritySettings</div>;
};

export default SecuritySettings;
