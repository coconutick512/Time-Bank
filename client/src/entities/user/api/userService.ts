/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { AncetaResponse, UserLogin } from '../types/schema';
import {
  UserAncetaResponseSchema,
  UserResponseSchema,
  type UserRegister,
  type UserResponse,
  type UserAnceta,
} from '../types/schema';
import axiosInstance from '@/shared/api/axiosinstance';

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

  findOne: async (id: number): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.get<UserResponse>(`/auth/${id.toString()}`);
      const validData = UserResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
};
