import { Theme } from "@/components/settings/theme/Theme";
import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import React from "react";

const ThemeSettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");

  return <Theme />;
};

export default ThemeSettings;
