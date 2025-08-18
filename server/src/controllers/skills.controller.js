const SkillsService = require('../services/skills.service.js');

class SkillsController {
  static async getAllSkills(req, res) {
    try {
      const skills = await SkillsService.getAllSkills();
      res.status(200).json(skills);
    } catch (error) {
      console.error('Error in getAllSkills controller:', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getSkillById(req, res) {
    try {
      const { id } = req.params;
      const skill = await SkillsService.getSkillById(id);

      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }

      res.status(200).json(skill);
    } catch (error) {
      console.error('Error in getSkillById controller:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SkillsController;
