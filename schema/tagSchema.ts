import { z } from "zod";
import { color } from "./workspaceSchema";

const tagName = z
  .string()
  .min(2, "Tag name is too short")
  .max(20, "Tag name is too long")
  .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
    message: "Tag name must only contain letters and digits",
  });

const id = z.string();

export const tagSchema = z.object({
  id,
  tagName,
  color,
});

export const apiTagSchema = z.object({
  id,
  workspaceId: id,
  tagName,
  color,
});

export const apiDeleteTagSchema = z.object({
  id,
  workspaceId: id,
});

export type ApiDeleteTagSchema = z.infer<typeof apiDeleteTagSchema>;

export type ApiTagSchema = z.infer<typeof apiTagSchema>;

export type TagSchema = z.infer<typeof tagSchema>;
