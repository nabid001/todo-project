import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(4).max(500),
  dueDate: z.date(),
  status: z.enum(["pending", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
});

export const InputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).max(50).optional(),
});
