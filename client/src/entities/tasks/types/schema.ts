import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  hours: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'canceled']),
  deadline: z.string(),
  creatorId: z.number(),
  executorId: z.number().nullish(),
  creator: z.object({
    name: z.string(),
  }),
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export const TaskUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'canceled']),
  executorId: z.number().optional(),
});

export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;

export type Task = z.infer<typeof TaskSchema>;

export const TaskResponseSchema = TaskSchema;

export const AllTasksResponseSchema = z.array(TaskSchema);

export const TasksStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  tasks: z.array(TaskSchema),
  error: z.string().nullable(),
  personalTask: z
    .object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      hours: z.string(),
      status: z.enum(['open', 'assigned', 'completed', 'canceled']),
      deadline: z.string(),
      creatorId: z.number(),
      executorId: z.number().optional(),
      creator: z.object({
        name: z.string(),
      }),
      categories: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
    })
    .nullable(),
});

export type TasksState = z.infer<typeof TasksStateSchema>;
