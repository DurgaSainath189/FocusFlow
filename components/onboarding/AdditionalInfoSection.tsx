"use client";

import { useOnboardingForm } from "@/context/OnboardingForm";

interface Props {
  profileImage?: string | null;
}

export const AdditionalInfoSection = ({ profileImage }: Props) => {
  const { currentStep } = useOnboardingForm();

  return (
    <section className="w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6">
      {/* <div className="mt-16 mb-8 w-full flex flex-col items-center">
        <AppTitle size={50} />

        {currentStep === 1 && <FirstStep profileImage={profileImage} />}
        {currentStep === 2 && <SecondStep />}
        {currentStep === 3 && <ThirdStep />}
        {currentStep === 4 && <Finish />}
      </div>
      <FormStepsInfo /> */}
    </section>
  );
};
