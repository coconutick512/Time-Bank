import { createSlice } from '@reduxjs/toolkit';
import type { TasksState } from '../types/schema';
import {  fetchAllTasks } from './tasksThunk';

const initialState: TasksState = {
    status: 'loading',
    tasks: [],
    error: null,
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
    },
});

export default tasksSlice.reducer;

export { tasksSlice };