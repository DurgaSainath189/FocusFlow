import { z } from "zod";

export const accountInfoSettingsSchema = z.object({
  username: z
    .string()
    .min(2, "Username is too short")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Username must only contain letters and digits",
    })
    .optional(),
  language: z.string({
    required_error: "Please select a language",
  }),
  name: z.string().optional(),
  surname: z.string().optional(),
});

export type AccountInfoSettingsSchema = z.infer<
  typeof accountInfoSettingsSchema
>;
