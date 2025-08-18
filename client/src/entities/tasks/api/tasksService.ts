/* eslint-disable @typescript-eslint/no-extraneous-class */
import axiosInstance from '@/shared/api/axiosinstance';
import type { TaskUpdate } from '../types/schema';
import { AllTasksResponseSchema, type Task, TaskSchema, TaskUpdateSchema } from '../types/schema';

export class TasksService {
  static async getTask(id: string): Promise<Task> {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      const validData = TaskSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getAllTasks(): Promise<Task[]> {
    try {
      const response = await axiosInstance.get('/tasks');
      const validData = AllTasksResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async editTask(data: TaskUpdate): Promise<void> {
    try {
      await axiosInstance.put(`/tasks/${data.id.toString()}`, data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
