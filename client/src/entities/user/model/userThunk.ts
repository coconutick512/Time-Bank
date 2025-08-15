import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../api/userService";
import type { UserLogin, UserRegister, UserScore } from "../types/schema";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = await UserService.refresh();
  console.log(user)
  return user;
});

export const logoutUser = createAsyncThunk("user/logoutsUser", async () => {
  await UserService.logout();
  return "Успешно вышли";
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData: UserLogin) => {
    const user = await UserService.login(formData);
    return user;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData: UserRegister) => {
    const user = await UserService.signUp(formData);
    return user;
  }

  
);
export const scoreUser = createAsyncThunk(
  "user/scoreUser",
  async (id: number) => {
    const user = await UserService.findOne(id);
    return user;
  }

  
);
