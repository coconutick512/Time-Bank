/* eslint-disable @typescript-eslint/no-extraneous-class */
import axiosInstance from '@/shared/api/axiosinstance';
import type { Category, CreateTaskData, TaskUpdate } from '../types/schema';
import { AllTasksResponseSchema, type Task, TaskCreateSchema, TaskSchema } from '../types/schema';
import type {  TaskCreate } from '../types/schema';

export class TasksService {
  static async getTask(id: string): Promise<Task> {
    try {
      const response = await axiosInstance.get(`/tasks/oneTask/${id}`);
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
      return data
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const res = await axiosInstance.post('/tasks/newTask', data);
      const validData = TaskCreateSchema.parse(res.data);
      return validData
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getUserTasks(userId: number): Promise<Task[]> {
    try {
      const response = await axiosInstance.get(`/tasks/user/${userId.toString()}`);
      const validData = AllTasksResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async fetchCategories(): Promise<Category> {
    try {
      const {data} = await axiosInstance.get<Category>('/tasks/categories');
      return data;
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getUserExecutedTasks(userId: number): Promise<Task[]> {
    try {
      const response = await axiosInstance.get(`/tasks/executed/${userId.toString()}`);
      const validData = AllTasksResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async deleteTask(id: number): Promise<void> {
    try {
      console.log(id,'OROROOROROR')
      await axiosInstance.delete(`/tasks/${id.toString()}`);
      return id
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async createSpecialTask(data: TaskCreate): Promise<Task> {
    try {
      const response = await axiosInstance.post('/tasks/create', data);
      const validData = TaskSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
