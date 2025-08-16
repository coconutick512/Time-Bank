const { User, Skill } = require("../../db/models");
const UserSkillService = require("../services/user.skills.service.js");

class UserSkillsController {
  static async getUserWithSkills(req, res) {
    try {
      const { id } = req.params;
      const user = await UserSkillService.getUserWithSkills(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при получении пользователя с навыками в контроллере",
      });
    }
  }

  static async getAllUsersWithSkills(req, res) {
    try {
      const users = await UserSkillService.getAllUsersWithSkills();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: "Ошибка при получении пользователей с навыками в контроллере",
      });
    }
  }
}

module.exports = UserSkillsController;
