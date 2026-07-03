import { z } from "zod";



export const signUpSchema = z.object({
  fullname: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters").max(30, "Password must be at most 30 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters").max(30, "Password must be at most 30 characters"),
});






export type SignUpSchema = z.infer<typeof signUpSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;