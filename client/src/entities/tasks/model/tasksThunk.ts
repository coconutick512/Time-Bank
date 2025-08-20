import { createAsyncThunk } from '@reduxjs/toolkit';
import { TasksService } from '../api/tasksService';
import type { TaskUpdate, TaskCreate, Task } from '../types/schema';

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id: string) => {
  const task = await TasksService.getTask(id);
  return task;
});

export const editTask = createAsyncThunk('tasks/editTask', async (data: TaskUpdate) => {
   await TasksService.editTask(data);
});

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
  const tasks = await TasksService.getAllTasks();
  return tasks;
});

export const fetchUserTasks = createAsyncThunk('tasks/fetchUserTasks', async (userId: number) => {
  const tasks = await TasksService.getUserTasks(userId);
  return tasks;
});

export const fetchUserExecutedTasks = createAsyncThunk(
  'tasks/fetchUserExecutedTasks',
  async (userId: number) => {
    const tasks = await TasksService.getUserExecutedTasks(userId);
    return tasks;
  },
);

export const createSpecialTask = createAsyncThunk(
  'tasks/createSpecialTask',
  async (data: TaskCreate): Promise<Task> => {
    const task = await TasksService.createSpecialTask(data);
    return task;
  },
);
