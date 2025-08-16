import { createAsyncThunk } from "@reduxjs/toolkit";
import { TasksService } from "../api/tasksService";

export const fetchTask = createAsyncThunk("tasks/fetchTask", async (id: number) => {
    const task = await TasksService.getTask(id);
    return task;
});

export const fetchAllTasks = createAsyncThunk("tasks/fetchAllTasks", async () => {
    const tasks = await TasksService.getAllTasks();
    return tasks;
}); 