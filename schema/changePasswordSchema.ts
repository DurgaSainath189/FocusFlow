import { z } from "zod";
import { password } from "./signInSchema";

export const changePasswordSchema = z
  .object({
    current_password: password,
    new_password: password,
    repeat_password: z.string(),
  })
  .refine((data) => data.new_password === data.repeat_password, {
    message: "Passwords are not the same",
    path: ["repeat_password"],
  })
  .refine((data) => data.new_password === data.current_password, {
    message: "Passwords are not the same",
    path: ["new_password"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
