import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../api/userService';
import type {
  UserSkillsResponse,
  UserLogin,
  UserRegister,
  UserResponse,
  AncetaResponse,
  ProfileUpdateResponse,
} from '../types/schema';
import type { UserOnlyResponse } from '../api/userService';

export const fetchUser = createAsyncThunk('user/fetchUser', async (): Promise<UserResponse> => {
  const user = await UserService.refresh();
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
export const fetchUserSkills = createAsyncThunk(
  'user/fetchUserSkills',
  async (id: number): Promise<UserSkillsResponse> => {
    const res = await UserService.fetchUserSkills(id);
    return res;
  },
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: number): Promise<UserOnlyResponse> => {
    console.log('Саночка принимает такой id:', userId);
    const response = await UserService.findOne(userId);
    console.log('Thunk received:', response);
    return response;
  },
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData: FormData): Promise<ProfileUpdateResponse> => {
    const response = await UserService.updateProfile(formData);
    return response;
  },
);
