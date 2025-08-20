import { createSlice } from '@reduxjs/toolkit';
import type { TasksState } from '../types/schema';
import { createTask, deleteTask, fetchAllTasks, fetchCategories, fetchTask } from './tasksThunk';

const initialState: TasksState = {
  status: 'loading',
  tasks: [],
  error: null,
  personalTask: null,
  categories: [],
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

    builder.addCase(fetchCategories.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories = [];
      state.error = action.error.message ?? 'Ошибка при получении категорий';
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.status = 'done';
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.error = null;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.error.message ?? 'Ошибка при удалении задач';
    });

    builder.addCase(createTask.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      state.status = 'done';
      state.error = null;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.error.message ?? 'Ошибка при создании задачи';
    });
  },
});

export default tasksSlice.reducer;

export { tasksSlice };
