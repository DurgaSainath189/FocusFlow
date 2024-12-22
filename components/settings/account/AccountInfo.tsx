"use client";
import { AddUserImage } from "@/components/onboarding/common/AddUserImage";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  accountInfoSettingsSchema,
  AccountInfoSettingsSchema,
} from "@/schema/accountInfoSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface Props {
  session: Session;
}

const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Telugu",
    value: "te",
  },
  {
    label: "Hindi",
    value: "hi",
  },
] as const;

export const AccountInfo = ({
  session: {
    user: { image, name, surname, username },
  },
}: Props) => {
  const t = useTranslations("SETTINGS");
  const m = useTranslations("MESSAGES");
  const lang = useLocale();

  const form = useForm<AccountInfoSettingsSchema>({
    resolver: zodResolver(accountInfoSettingsSchema),
    defaultValues: {
      username: username!,
      language: lang,
      name: name ? name : "",
      surname: surname ? surname : "",
    },
  });
  return (
    <Card>
      <CardContent>
        <div>
          <p>{t("ACCOUNT.IMAGE")}</p>
          <AddUserImage />
        </div>
        <Form {...form}>
          <form>
            <div>
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ACCOUNT.USERNAME")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("ACCOUNT.USERNAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ACCOUNT.FIRST_NAME")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("ACCOUNT.FIRST_NAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ACCOUNT.SURNAME")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("ACCOUNT.SURNAME_PLACEHOLDER")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
