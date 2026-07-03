import { z } from "zod";

export interface BlogUser {
  _id: string;
  fullname: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  user: BlogUser;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  totalPages: number;
  blogs: Blog[];
}

export const categories = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Start up', 'Other'];


const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

export const blogSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be at most 100 characters"),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters").max(100, "Subtitle must be at most 100 characters"),
  description: z.string().min(15, "Description must be at least 15 characters"),
  category: z
    .string()
    .refine((value): value is (typeof categories)[number] => categories.includes(value), {
      message: "Please select a category.",
    }),
  image: z
    .instanceof(File, { message: "Please select an image." })
    .refine((file) => file.size > 0, {
      message: "Please select an image.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only PNG, JPG, JPEG, and GIF files are allowed.",
    }),
});

export type BlogSchema = z.infer<typeof blogSchema>;
