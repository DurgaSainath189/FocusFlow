import { z } from "zod";

export const textNodeSchema = z.object({
  text: z.string().min(4, "Text is too short"),
});

export type TextNodeSchema = z.infer<typeof textNodeSchema>;
