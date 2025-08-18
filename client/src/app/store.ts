import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '@/entities/user/model/userSlice';
import executorReducer from '@/entities/executors/model/executorSlice';
import tasksReducer from '@/entities/tasks/model/tasksSlice';
import skillsReducer from '@/entities/skills/model/skillsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    executors: executorReducer,
    tasks: tasksReducer,
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
