import { z } from 'zod';

export const SkillSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Skill = z.infer<typeof SkillSchema>;

export const SkillsResponseSchema = z.array(SkillSchema);

export type SkillsResponse = z.infer<typeof SkillsResponseSchema>;

export const SkillsStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  skills: z.array(SkillSchema),
  error: z.string().nullable(),
});

export type SkillsState = z.infer<typeof SkillsStateSchema>;
