import { z } from "zod";

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(20).max(2000),
  website: z.string().optional().default(""),
  startedAt: z.coerce.number().int().positive(),
  turnstileToken: z.string().trim().min(1),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
