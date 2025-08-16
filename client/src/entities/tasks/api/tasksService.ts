/* eslint-disable @typescript-eslint/no-extraneous-class */
import axiosInstance from "@/shared/api/axiosinstance";
import { AllTasksResponseSchema,type Task, TaskSchema } from "../types/schema";

export class TasksService {
    static async getTask(id: number): Promise<Task> {
        try {
            const response = await axiosInstance.get(`/tasks/${id.toString()}`);
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
            const response = await axiosInstance.get("/tasks");
            const validData = AllTasksResponseSchema.parse(response.data);
            return validData;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            throw error;
        }
    }
}   