import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../types/schema';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  scoreUser,
  submitAnceta,
} from './userThunk';

const initialState: UserState = {
  status: 'loading',
  user: null,
  error: null,
  score: null,
  profileCompleted: false,
  profileData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => void action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';

        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'logged';

        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'guest';
        state.user = null;
        state.error = action.error.message ?? 'Ошибка при регистрации';
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'logged';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'guest';
        state.user = null;
        state.error = action.error.message ?? 'Ошибка при входе в аккаунт';
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';

        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'guest';
        state.user = null;
        state.error = null;
        state.score = null;
        state.profileData = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'logged';
        state.error = action.error.message ?? 'Ошибка при выходе из аккаунта';
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';

        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'logged';

        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'guest';

        state.user = null;
        state.error = action.error.message ?? 'Ошибка при обновлении токена';
      });

    builder
      .addCase(scoreUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(scoreUser.fulfilled, (state) => {
        state.status = 'logged';

        state.score = null;
      })
      .addCase(scoreUser.rejected, (state, action) => {
        state.status = 'guest';
        state.score = null;
        state.error = action.error.message ?? 'Ошибка при обновлении токена';
      });
    builder
      .addCase(submitAnceta.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitAnceta.fulfilled, (state, action) => {
        state.status = 'logged';
        state.profileData = action.payload.user;
        state.error = null;
      })
      .addCase(submitAnceta.rejected, (state, action) => {
        state.status = 'guest';
        state.profileData = null;
        state.error = action.error.message ?? 'Ошибка при обновлении токена';
      });
  },
});

export default userSlice.reducer;
