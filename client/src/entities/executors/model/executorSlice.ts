import { createSlice } from '@reduxjs/toolkit';
import type { ExecutorsState } from '../types/schema';
import {  fetchAllExecutors } from './executorThunk';

const initialState: ExecutorsState = {
  status: 'loading',
  executors: [],
  error: null,
};

const executorSlice = createSlice({
  name: 'executor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExecutors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllExecutors.fulfilled, (state, action) => {
        console.log(action.payload,'AAAAAAAAAAAA');
        state.status = 'done';
        state.executors = action.payload;
        state.error = null;
      })
      .addCase(fetchAllExecutors.rejected, (state, action) => {
        state.status = 'reject';
        state.executors = [];
        state.error = action.error.message ?? 'Ошибка при получении исполнителя';
      });
  },
});

export default executorSlice.reducer;

export { executorSlice };
