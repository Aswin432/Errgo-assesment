import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const projectIdSchema = z.object({
  id: z.string().uuid("Invalid project ID format"),
});
