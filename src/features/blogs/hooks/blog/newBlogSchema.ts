import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "Select at least one tag"),
});

export type CreateBlogFormSchema = z.infer<typeof createBlogSchema>;

export const createBlogdefaultValues: CreateBlogFormSchema = {
  title: "",
  content: "",
  tags: [],
};
