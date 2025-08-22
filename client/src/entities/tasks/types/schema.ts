/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  hours: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'running']),
  deadline: z.string(),
  creatorId: z.number(),
  executorId: z.number().nullish(),
  created_at: z.string(),
  creator: z.object({
    name: z.string(),
  }),
  bookedDates: z
    .union([z.array(z.string()), z.string(), z.null(), z.undefined()])
    .optional()
    .nullable()
    .transform((val): string[] | string | null => {
      if (!val) return null;
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return [val];
        }
      }
      return val;
    }),
  categories: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .nullable()
    .optional(),
});

export type CreateTaskData = {
  title: string;
  description: string;
  hours: string;
  status: string;
  deadline: string;
  categories: number[];
  creatorId: number;
};

export const TaskUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'running']),
  executorId: z.number().optional(),
});

export const TaskCategoriesResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);

export type Category = z.infer<typeof TaskCategoriesResponseSchema>;

export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;

export type Task = z.infer<typeof TaskSchema>;

export const TaskResponseSchema = TaskSchema;

export const AllTasksResponseSchema = z.array(TaskSchema);

export const TasksStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  tasks: z.array(TaskSchema),
  executedTasks: z.array(TaskSchema),
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
      created_at: z.string(),
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
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  autoSelectTaskId: z.number().nullable(), // Add this new field
});

export type TasksState = z.infer<typeof TasksStateSchema>;

export const TaskCreateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
  created_at: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'running']),
  creator: z.object({
    name: z.string(),
  }),
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  hours: z.string(),
  bookedDate: z.string().optional().nullable(),
  executorId: z.number().optional().nullable(),
  creatorId: z.number(), // Add this
});

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
