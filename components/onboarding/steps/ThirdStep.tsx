import { Form } from "@/components/ui/form";
import { imageSchema, ImageSchema } from "@/schema/imageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UploadFile } from "../common/UploadFile";
import { workspaceSchema, WorkspaceSchema } from "@/schema/workspaceSchema";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { ActionType } from "@/types/onBoardingContext";

export const ThirdStep = () => {
  const [uploadError, setUploadError] = useState(false);
  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const m = useTranslations("MESSAGES");

  const { currentStep, dispatch } = useOnboardingForm();
  const { toast } = useToast();
  const t = useTranslations("ONBOARDING_FORM");

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      setUploadError(true);
      toast({
        title: m("ERRORS.WORKSPACE_ICON_ADDED"),
        variant: "destructive",
      });
    },
    onClientUploadComplete: (data) => {
      if (data) {
        dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url });
      } else {
        setUploadError(true);
        toast({
          title: m("ERRORS.WORKSPACE_ICON_ADDED"),
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = async (data: ImageSchema) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full my-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl max-w-md">
          Create a workspace
        </h2>
      </div>
      <Form {...form}>
        <form
          className="w-full max-w-md space-y-8 mt-12"
        >
          <UploadFile
            form={form}
            schema={imageSchema}
            inputAccept="image/*"
            typesDescription={[".jpeg", ".jpg", ".png", ".webp", ".gif"]}
          />
          <button>add</button>
        </form>
      </Form>
    </>
  );
};
