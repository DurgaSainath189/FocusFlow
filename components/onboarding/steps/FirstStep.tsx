import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import {
  AdditionalUserInfoFirstPart,
  additionalUserInfoFirstPart,
} from "@/schema/additionalUserInfoFirstPart";
import { ActionType } from "@/types/onBoardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddUserImage } from "./AddUserImage";

export const FirstStep = () => {
  const { currentStep, name, surname, profileImage, dispatch } =
    useOnboardingForm();
  const form = useForm<AdditionalUserInfoFirstPart>({
    resolver: zodResolver(additionalUserInfoFirstPart),
    defaultValues: {
      name: name ? name : "",
      surname: surname ? surname : "",
    },
  });

  const onSubmit = (data: AdditionalUserInfoFirstPart) => {
    console.log(data);

    dispatch({ type: ActionType.NAME, payload: data.name });
    dispatch({ type: ActionType.SURNAME, payload: data.surname });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };
  return (
    <div className="max-w-md w-full space-y-8">
      {/* <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-sm text-muted-foreground">Add a photo</p>
        <div className="bg-muted w-16 md:h-20 md:w-20 h-16 rounded-full flex justify-center items-center text-muted-foreground">
          <User />
        </div>
      </div> */}
      <AddUserImage profileImage={profileImage} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-1.8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your name.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Surname
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-muted"
                      placeholder="Enter your surname.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            // onClick={() =>
            //   dispatch({
            //     type: ActionType.CHANGE_SITE,
            //     payload: currentStep + 1,
            //   })
            // }
            className="w-full max-w-md dark:text-black font-semibold"
          >
            Continue
            <ArrowRight className="" height={18} width={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};
