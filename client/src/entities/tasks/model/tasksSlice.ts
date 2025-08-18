import { createSlice } from '@reduxjs/toolkit';
import type { TasksState } from '../types/schema';
import { fetchAllTasks, fetchTask } from './tasksThunk';

const initialState: TasksState = {
  status: 'loading',
  tasks: [],
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
      });
    builder
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
      });
  },
});

export default tasksSlice.reducer;

export { tasksSlice };
