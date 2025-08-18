import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../api/userService';
import type { UserLogin, UserRegister, UserResponse, AncetaResponse } from '../types/schema';

export const fetchUser = createAsyncThunk('user/fetchUser', async (): Promise<UserResponse> => {
  const user = await UserService.refresh();
  console.log(user);
  return user;
});

export const logoutUser = createAsyncThunk('user/logoutsUser', async (): Promise<string> => {
  await UserService.logout();
  return 'Успешно вышли';
});

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: UserLogin): Promise<UserResponse> => {
    const user = await UserService.login(formData);
    return user;
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData: UserRegister): Promise<UserResponse> => {
    const user = await UserService.signUp(formData);
    return user;
  },
);
export const scoreUser = createAsyncThunk(
  'user/scoreUser',
  async (id: number): Promise<UserResponse> => {
    const user = await UserService.findOne(id);
    return user;
  },
);
export const submitAnceta = createAsyncThunk(
  'user/submitAnceta',
  async (formData: FormData): Promise<AncetaResponse> => {
    const res = await UserService.submitAnceta(formData);
    return res;
  },
);
