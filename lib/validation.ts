import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(4).max(500),
  dueDate: z.date(),
  status: z.enum(["pending", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
});
