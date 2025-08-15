import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../types/schema";
import { fetchUser, loginUser, logoutUser, registerUser, scoreUser } from "./userThunk";

const initialState: UserState = {
  status: "loading",
  user: null,
  error: null,
  score: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "loading";
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "logged";
        state.user = null;
        state.error = action.error.message ?? "Ошибка при входе в аккаунт";
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "guest";
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "logged";
        state.error = action.error.message ?? "Ошибка при выходе из аккаунта";
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "logged";
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "guest";
        state.user = null;
        state.error = action.error.message ?? "Ошибка при обновлении токена";
      });

      builder
        .addCase(scoreUser.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(scoreUser.fulfilled, (state, action) => {
          state.status = "logged";
          state.score = action.payload.user;
          state.error = null;
        })
        .addCase(scoreUser.rejected, (state, action) => {
          state.status = "guest";
          state.score = null;
          state.error = action.error.message ?? "Ошибка при обновлении токена";
        });
  },
});

export default userSlice.reducer;
