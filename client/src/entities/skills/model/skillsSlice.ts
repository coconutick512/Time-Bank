import { createSlice } from '@reduxjs/toolkit';
import type { SkillsState } from '../types/schema';
import { fetchAllSkills, fetchSkillById } from './skillsThunk';

const initialState: SkillsState = {
  status: 'loading',
  skills: [],
  error: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.status = 'done';
        state.skills = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.status = 'reject';
        state.skills = [];
        state.error = action.error.message ?? 'Ошибка при получении навыков';
      })
      .addCase(fetchSkillById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        state.status = 'done';
        // Add skill to array if not already present
        const existingSkill = state.skills.find((skill) => skill.id === action.payload.id);
        if (!existingSkill) {
          state.skills.push(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.status = 'reject';
        state.error = action.error.message ?? 'Ошибка при получении навыка';
      });
  },
});

export default skillsSlice.reducer;
