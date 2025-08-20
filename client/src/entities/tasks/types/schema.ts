import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  hours: z.string(),
  status: z.enum(['open', 'assigned', 'completed', 'canceled']),
  deadline: z.string(),
  creatorId: z.number(),
  executorId: z.number().nullable(),
  creator: z.object({
    name: z.string(),
  }),
  bookedDates: z
    .union([z.array(z.string()), z.string(), z.null(), z.undefined()])
    .optional()
    .nullable()
    .transform((val) => {
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
});

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

export const TaskCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
  bookedDate: z.string(),
  executorId: z.number(),
  creatorId: z.number(), // Add this
});

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
