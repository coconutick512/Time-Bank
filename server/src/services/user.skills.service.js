const { User, Skill, UserSkill } = require("../../db/models");

class UserSkillService {
  static async getUserWithSkills(id) {
    try {
      const user = await User.findByPk(id, {
        include: [
          {
            model: Skill,
            as: "skills",
            attributes: ["name"],
            required: true,
          },
        ],
      });


      return user;
    } catch (error) {
      console.error("Error fetching user with skills:", error);
      throw error;
    }
  }

  static async getAllUsersWithSkills() {
    try {
      const users = await User.findAll({
        include: [
          {
            through: {
            model: UserSkill,
            attributes: [],
          },
            model: Skill,
            as: "skills",
            attributes: ["name" , "id"],
            required: true,
          },
        ],
      });
      return users;
    } catch (error) {
      console.error("Error fetching user with skills:", error);
      throw error;
    }
  }
}

module.exports = UserSkillService;
