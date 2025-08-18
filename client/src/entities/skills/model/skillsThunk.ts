import { createAsyncThunk } from '@reduxjs/toolkit';
import { SkillsService } from '../api/skillsService';

export const fetchAllSkills = createAsyncThunk('skills/fetchAllSkills', async () => {
  const skills = await SkillsService.getAllSkills();
  return skills;
});

export const fetchSkillById = createAsyncThunk('skills/fetchSkillById', async (id: number) => {
  const skill = await SkillsService.getSkillById(id);
  return skill;
});
