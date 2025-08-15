import type { UserLogin } from "../types/schema";
import {
  UserResponseSchema,
  type UserRegister,
  type UserResponse,
} from "../types/schema";
import axiosInstance from "@/shared/api/axiosinstance";

export class UserService {
  static async signUp(formData: UserRegister) {
    try {
      const response = await axiosInstance.post<UserResponse>(
        "/auth/signup",
        formData
      );
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
      const response = await axiosInstance.post<UserResponse>(
        "/auth/signin",
        formData
      );
      const validData = UserResponseSchema.parse(response.data);
      console.log(validData)
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
      await axiosInstance.get("/auth/logout");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async refresh() {
    try {
      const response = await axiosInstance.get<UserResponse>("auth/refresh");
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
      const response = await axiosInstance.get<UserResponse>(`/auth/${id}`);
      const validData = UserResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
