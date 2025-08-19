import { createAsyncThunk } from '@reduxjs/toolkit';
import { TasksService } from '../api/tasksService';
import type { TaskUpdate } from '../types/schema';

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
