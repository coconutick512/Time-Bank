import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../types/schema';
import {
  fetchUser,
  fetchUserSkills,
  loginUser,
  logoutUser,
  registerUser,
  scoreUser,
  submitAnceta,
  fetchUserById,
  updateProfile,
} from './userThunk';

const initialState: UserState = {
  status: 'loading',
  user: null,
  error: null,
  score: null,
  profileCompleted: false,
  profileData: null,
  skills: null,
  viewingUser: null, // Add this for storing other user's data
  viewingUserSkills: null, // Add this for other user's skills
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
      // .addCase(logoutUser.pending, (state) => {
      //   state.status = 'loading';
      //   state.error = null;
      // })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'guest';
        state.user = null;
        state.error = null;
        state.profileData = null;
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
        state.status = 'reject';
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
        state.status = 'reject';
        state.profileData = null;
        state.error = action.error.message ?? 'Ошибка при обновлении токена';
      });
    builder
      .addCase(fetchUserSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.status = 'logged';
        state.skills = action.payload;
        state.error = null;
      })
      .addCase(fetchUserSkills.rejected, (state, action) => {
        state.status = 'reject';
        state.skills = null;
        state.error = action.error.message ?? 'Ошибка при обновлении токена';
      });
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'logged';
        console.log('Slice storing viewingUser:', action.payload.user);
        state.viewingUser = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'reject';
        state.viewingUser = null;
        state.error = action.error.message ?? 'Ошибка при получении пользователя';
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'logged';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'reject';
        state.error = action.error.message ?? 'Ошибка при обновлении профиля';
      });
  },
});

export default userSlice.reducer;
