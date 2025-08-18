const { Skill } = require('../../db/models');

class SkillsService {
  static async getAllSkills() {
    try {
      const skills = await Skill.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  }

  static async getSkillById(id) {
    try {
      const skill = await Skill.findByPk(id, {
        attributes: ['id', 'name'],
      });
      return skill;
    } catch (error) {
      console.error('Error fetching skill:', error);
      throw error;
    }
  }
}

module.exports = SkillsService;
