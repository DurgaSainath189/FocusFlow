import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const Settings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return <div>Settings</div>;
};

export default Settings;
