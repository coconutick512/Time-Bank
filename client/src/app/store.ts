import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import  userReducer  from "@/entities/user/model/userSlice";
import  executorReducer  from "@/entities/executors/model/executorSlice";
import  tasksReducer  from "@/entities/tasks/model/tasksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    executors: executorReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
