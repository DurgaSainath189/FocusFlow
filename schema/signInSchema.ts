import { z } from "zod";

export const password = z
  .string()
  .refine((password) => password.length >= 6, {
    message: "Password must have at least 6 characters",
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /\d/.test(password), {
    message: "Password must contain at least one digit",
  });

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
