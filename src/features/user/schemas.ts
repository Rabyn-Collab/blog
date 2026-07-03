import { z } from "zod";
import { categories } from "../blogs/schemas";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];



export const updateblogSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be at most 100 characters"),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters").max(100, "Subtitle must be at most 100 characters"),
  description: z.string().min(15, "Description must be at least 15 characters").max(500, "Description must be at most 500 characters"),
  category: z
    .string()
    .refine((value): value is (typeof categories)[number] => categories.includes(value), {
      message: "Please select a category.",
    }),
  image: z
    .union([z.instanceof(File), z.null(), z.undefined()])
    .refine(
      (file) =>
        !file ||
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message: "Only PNG, JPG, JPEG, and GIF files are allowed.",
      }
    ),
});

export type UpdateBlogSchema = z.infer<typeof updateblogSchema>;
