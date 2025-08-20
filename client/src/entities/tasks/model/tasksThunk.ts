import { createAsyncThunk } from '@reduxjs/toolkit';
import { TasksService } from '../api/tasksService';
import type { CreateTaskData,  TaskUpdate } from '../types/schema';



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


export const fetchCategories = createAsyncThunk('tasks/fetchCategories', async () => {
  const categories = await TasksService.fetchCategories();
  return categories;
});

export const createTask = createAsyncThunk('tasks/createTask', async (data: CreateTaskData) => {
  const response = await TasksService.createTask(data);
  return response
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await TasksService.deleteTask(id);
  return id
});
