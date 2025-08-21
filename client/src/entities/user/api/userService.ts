import type { AncetaResponse, UserLogin, ProfileUpdateResponse } from '../types/schema';
import {
  UserSchema,
  UserAncetaResponseSchema,
  UserResponseSchema,
  ProfileUpdateResponseSchema,
  type UserRegister,
  type UserResponse,
  type User,
} from '../types/schema';
import axiosInstance from '@/shared/api/axiosinstance';
import { z } from 'zod';

export const UserOnlySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  balance: z
    .string()
    .transform((val) => Number(val))
    .or(z.number())
    .optional(),
  avatar: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  about: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  skills: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .optional()
    .nullable(),
  created_at: z.string().optional().nullable(),
  availableDates: z.array(z.string()).optional().nullable(),
});

export type UserOnly = z.infer<typeof UserOnlySchema>;

// You already have UserOnlySchema, now let's create a response schema for it
export const UserOnlyResponseSchema = z.object({
  user: UserOnlySchema,
});

export type UserOnlyResponse = z.infer<typeof UserOnlyResponseSchema>;

export const UserService = {
  signUp: async (formData: UserRegister): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.post<UserResponse>('/auth/signup', formData);
      const validData = UserResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  login: async (formData: UserLogin): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.post<UserResponse>('/auth/signin', formData);
      const validData = UserResponseSchema.parse(response.data);
      console.log(validData);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.delete('/auth/logout');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  refresh: async (): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.get<UserResponse>('auth/refresh');
      const validData = UserResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  findOne: async (id: number): Promise<UserOnlyResponse> => {
    try {
      const response = await axiosInstance.get<UserOnlyResponse>(`/auth/${id.toString()}`);
      console.log('Raw user data from API:', response.data);
      const validData = UserOnlyResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error;
    }
  },

  submitAnceta: async (formData: FormData): Promise<AncetaResponse> => {
    try {
      const response = await axiosInstance.post<AncetaResponse>('/auth/submitForm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const validData = UserAncetaResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },
  fetchUserSkills: async (id: number): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>(`/users/${id.toString()}`);
      console.log(123123);
      const validData = UserSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  updateProfile: async (formData: FormData): Promise<ProfileUpdateResponse> => {
    try {
      const response = await axiosInstance.put<ProfileUpdateResponse>(
        '/auth/updateProfile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const validData = ProfileUpdateResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },
};
