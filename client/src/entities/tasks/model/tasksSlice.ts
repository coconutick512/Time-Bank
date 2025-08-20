import { createSlice } from '@reduxjs/toolkit';
import type { TasksState } from '../types/schema';
import {
  createSpecialTask,
  fetchAllTasks,
  fetchTask,
  fetchUserTasks,
  fetchUserExecutedTasks,
} from './tasksThunk';

const initialState: TasksState = {
  status: 'loading',
  tasks: [],
  executedTasks: [], // Add this for executed tasks
  error: null,
  personalTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = 'done';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'reject';
        state.tasks = [];
        state.error = action.error.message ?? 'Ошибка при получении задач';
      })
      .addCase(fetchTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = 'done';
        state.personalTask = action.payload;
        state.error = null;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'reject';
        state.personalTask = null;
        state.error = action.error.message ?? 'Ошибка при получении задач';
      })
      .addCase(fetchUserTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.status = 'done';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.status = 'reject';
        state.tasks = [];
        state.error = action.error.message ?? 'Ошибка при получении задач';
      })
      .addCase(fetchUserExecutedTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserExecutedTasks.fulfilled, (state, action) => {
        state.status = 'done';
        state.executedTasks = action.payload;
        state.error = null;
      })
      .addCase(fetchUserExecutedTasks.rejected, (state, action) => {
        state.status = 'reject';
        state.executedTasks = [];
        state.error = action.error.message ?? 'Ошибка при получении выполненных задач';
      })
      .addCase(createSpecialTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createSpecialTask.fulfilled, (state, action) => {
        state.status = 'done';
        state.tasks.push(action.payload);
      })
      .addCase(createSpecialTask.rejected, (state, action) => {
        state.status = 'reject';
        state.error = action.error.message ?? 'Ошибка создания задачи';
      });
  },
});

export default tasksSlice.reducer;

export { tasksSlice };
