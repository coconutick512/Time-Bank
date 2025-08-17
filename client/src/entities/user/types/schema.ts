import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  balance: z.number(),
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
  status: 'loading' | 'guest' | 'logged';
  user: User | null;
  error: string | null;
  score: UserScore | null;
  profileCompleted: boolean;
  profileData: UserAnceta | null;
};
export const UserAncetaSchema = z.object({
  avatar: z.string().optional(),
  skilltoshares: z.array(z.string()).optional(),
  skillstolearn: z.array(z.string()).optional(),
  competency: z.string().optional(),
  time: z.any().optional(),
  about: z.string().optional(),
});

export const UserAncetaResponseSchema = z.object({
  user: UserAncetaSchema,
  accessToken: z.string(),
});
export type AncetaResponse = z.infer<typeof UserAncetaResponseSchema>;

export type UserAncetaResponse = z.infer<typeof UserAncetaResponseSchema>;
export type UserAnceta = z.infer<typeof UserAncetaSchema>;
