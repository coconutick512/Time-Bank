import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  balance: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const UserResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export const UserLoginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const UserScoreSchema = z.object({
  score: z.number().min(0, "Не верный ответ"),
});

export type UserScore = z.infer<typeof UserScoreSchema>;

export type UserState = {
  status: "loading" | "guest" | "logged";
  user: User | null;
  error: string | null;
  score: UserScore | null;
};
