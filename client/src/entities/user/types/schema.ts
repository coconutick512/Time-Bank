import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  balance: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val), { message: 'Balance must be a valid number' })
    .optional()
    .or(z.number().optional()),
  avatar: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  about: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  role: z.string(),
  skills: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .optional()
    .nullable(),
  created_at: z.string().optional().nullable(),
  availableDates: z.array(z.string()).optional().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const UserResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export const UserLoginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const UserScoreSchema = z.object({
  score: z.number().min(0, 'Не верный ответ'),
});

export type UserScore = z.infer<typeof UserScoreSchema>;

export type UserState = {
  status: 'loading' | 'guest' | 'logged' | 'done' | 'reject';
  user: User | null;
  error: string | null;
  profileCompleted: boolean;
  profileData: UserAnceta | null;
  skills: UserSkillsResponse | null;
  viewingUser: User | null;
  viewingUserSkills: UserSkillsResponse | null;
};
export const UserAncetaSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  timezone: z.string().optional(),
  avatar: z.string().optional(),
  time: z.any().optional(),
  about: z.string().optional(),
  city: z.string().optional(),
  skills: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
});

export const UserAncetaResponseSchema = z.object({
  user: UserAncetaSchema,
  accessToken: z.string(),
});
export const UserSkillsResponseSchema = z.object({
  skills: z.array(z.object({ id: z.number(), name: z.string() })),
});
export type UserSkillsResponse = z.infer<typeof UserAncetaSchema>;
export type AncetaResponse = z.infer<typeof UserAncetaResponseSchema>;

export type UserAncetaResponse = z.infer<typeof UserAncetaResponseSchema>;
export type UserAnceta = z.infer<typeof UserAncetaSchema>;
export const ProfileUpdateDataSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  city: z.string().optional(),
  timezone: z.string().optional(),
  about: z.string().optional(),
  availableDates: z.array(z.string()).optional(),
  skillIds: z.array(z.number()).optional(),
});

export type ProfileUpdateData = z.infer<typeof ProfileUpdateDataSchema>;

export const ProfileUpdateResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    city: z.string().nullable(),
    timezone: z.string().nullable(),
    about: z.string().nullable(),
    availableDates: z.array(z.string()).nullable(),
    avatar: z.string().nullable(),
    balance: z.number().optional(),
    created_at: z.string().optional(),
  }),
  message: z.string(),
});

export type ProfileUpdateResponse = z.infer<typeof ProfileUpdateResponseSchema>;
