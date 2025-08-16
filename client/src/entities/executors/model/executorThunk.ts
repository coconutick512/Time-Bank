import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExecutorService } from "../api/executorService";

export const fetchExecutor = createAsyncThunk("executor/fetchExecutor", async (id: number) => {
  const executor = await ExecutorService.getExecutor(id);
  return executor;
});

export const fetchAllExecutors = createAsyncThunk("executor/fetchAllExecutors", async () => {
  const executors = await ExecutorService.getAllExecutors();
  return executors;
});