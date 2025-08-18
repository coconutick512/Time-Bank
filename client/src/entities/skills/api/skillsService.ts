import axiosInstance from '@/shared/api/axiosinstance';
import {
  SkillsResponseSchema,
  type SkillsResponse,
  type Skill,
  SkillSchema,
} from '../types/schema';

export class SkillsService {
  static async getAllSkills(): Promise<SkillsResponse> {
    try {
      const response = await axiosInstance.get('/skills');
      const validData = SkillsResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }

  static async getSkillById(id: number): Promise<Skill> {
    try {
      const response = await axiosInstance.get(`/skills/${id.toString()}`);
      const validData = SkillSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  }
}
