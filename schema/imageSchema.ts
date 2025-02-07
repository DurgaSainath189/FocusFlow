import { z } from "zod";

export const MAX_FILE_SIZE = 400000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z.object({
  image: z
    .any()
    .optional()
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpeg, .jpg, .png, .webp, .gif types are supported"
    ),
});

export type ImageSchema = z.infer<typeof imageSchema>;
