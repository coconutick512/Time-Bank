import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '@/entities/user/model/userSlice';
import executorReducer from '@/entities/executors/model/executorSlice';
import tasksReducer from '@/entities/tasks/model/tasksSlice';
import languageReducer from '@/entities/language/model/languageSlice';
import skillsReducer from '@/entities/skills/model/skillsSlice';
import chatReducer from '@/entities/chat/model/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    executors: executorReducer,
    tasks: tasksReducer,
    language: languageReducer,
    skills: skillsReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
