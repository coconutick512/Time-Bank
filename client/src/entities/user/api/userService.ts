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

export class UserService {
  static async signUp(formData: UserRegister) {
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
  }

  static async login(formData: UserLogin) {
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
  }

  static async logout() {
    try {
      await axiosInstance.delete('/auth/logout');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async refresh() {
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
  }

  static async findOne(id: number) {
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
  }

  static async submitAnceta(formData: UserAnceta) {
    try {
      const response = await axiosInstance.post<AncetaResponse>('/auth/anceta', formData);
      const validData = UserAncetaResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
