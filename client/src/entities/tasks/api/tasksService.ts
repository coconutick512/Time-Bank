import axiosInstance from "@/shared/api/axiosinstance";
import { AllTasksResponseSchema, TaskSchema } from "../types/schema";

export class TasksService {
    static async getTask(id: number) {
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

    static async getAllTasks() {
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