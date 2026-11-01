import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("You must provide a valid email!"),
  password: z.string().min(1, "Password is required!"),
});

export const registerSchema = z
  .object({
    email: z.email("You must provide a valid email!"),
    displayName: z
      .string()
      .trim()
      .min(4, "Display name must be at least 4 characters long!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export const listingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, "Product name must be at least 4 characters long!"),
  price: z
    .number({ error: "Price must be a number!" })
    .positive("Product price must be more than $0!")
    .multipleOf(0.01, "Price can have at most 2 decimals!"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long!")
    .max(500, "Description cannot be more than 500 characters long!"),
  imageurl: z.url({
    protocol: /^https?$/,
    error: "Image link must start with http:// or https://!",
  }),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ListingValues = z.infer<typeof listingSchema>;
