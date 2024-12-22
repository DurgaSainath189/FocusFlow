import { AccountInfo } from "@/components/settings/account/AccountInfo";
import { Heading } from "@/components/settings/account/Heading";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const Settings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return (
    <div>
      <Heading />
      <AccountInfo session={session} />
    </div>
  );
};

export default Settings;
