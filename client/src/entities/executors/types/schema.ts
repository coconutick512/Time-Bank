import { z } from 'zod';

export const ExecutorSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().optional().nullable(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  about: z.string().optional(),
  email: z.string().email(),
  balance: z.string(),
  skills: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export const ExecutorResponseSchema = ExecutorSchema;

export const AllExecutorsResponseSchema = z.array(ExecutorSchema);

export const ExecutorsStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  executors: z.array(ExecutorSchema),
  error: z.string().nullable(),
});

export type Executor = z.infer<typeof ExecutorSchema>;
export type ExecutorResponse = z.infer<typeof ExecutorResponseSchema>;
export type AllExecutorsResponse = z.infer<typeof AllExecutorsResponseSchema>;
export type ExecutorsState = z.infer<typeof ExecutorsStateSchema>;
