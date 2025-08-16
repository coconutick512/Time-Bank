import { AllExecutorsResponseSchema, ExecutorSchema } from "../types/schema";
import axiosInstance from "@/shared/api/axiosinstance";

export class ExecutorService {
  static async getExecutor(id: number) {
    try {
      const response = await axiosInstance.get(`/executors/${id}`);
      const validData = ExecutorSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getAllExecutors() {
    try {
      const response = await axiosInstance.get("/users");
       return AllExecutorsResponseSchema.parse(response.data); 
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}