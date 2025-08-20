/* eslint-disable @typescript-eslint/no-extraneous-class */
import { AllExecutorsResponseSchema, type Executor, ExecutorSchema } from '../types/schema';
import axiosInstance from '@/shared/api/axiosinstance';

export class ExecutorService {
  static async getExecutor(id: number): Promise<Executor> {
    try {
      const response = await axiosInstance.get(`/users/${id.toString()}`);
      const validData = ExecutorSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getAllExecutors(): Promise<Executor[]> {
    try {
      const response = await axiosInstance.get('/users');
      console.log('__________________', response.data);
      return AllExecutorsResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
