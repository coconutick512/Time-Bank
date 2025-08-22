const { User, UserSkill, Skill } = require("../../db/models/");
const bcrypt = require("bcrypt");

class AuthService {
  static async createUser({ email, password, name }) {
    try {
      
      if (!email || !password || !name) {
        throw new Error("Не все поля");
      }
  
      const hashpass = await bcrypt.hash(password, 10);
  
      const user = await User.create({ email, name, hashpass });
      if (!user) {
        throw new Error("Не смог создать user");
      }
  
      const plainUser = user.get();
      delete plainUser.hashpass;
  
      return plainUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  //   static async findUserByEmail(email) {
  //     if (!email) return null;
  //     const artist = await User.findOne({ where: { email } });
  //     return artist ? artist.get() : null;
  //   }

  static async checkPassword(password, hashpass) {
    try {
      return bcrypt.compare(password, hashpass);
      
    } catch (error) {
      console.error("Error checking password:", error);
      throw error;
    }
  }

  static async signin({ email, password }) {
    try {
      
      if (!email || !password) {
        throw new Error("Не все поля");
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Пользователь не найден");
      }
      const isMatch = await bcrypt.compare(password, user.hashpass);
      if (!isMatch) {
        throw new Error("Неверный пароль");
      }
      const plainUser = user.get();
      delete plainUser.hashpass;
      return { user: plainUser };
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  static async findOne(id) {
    try {
      
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Пользователь не найден");
      }
      const plainUser = user.get();
      delete plainUser.hashpass;
      return { user: plainUser };
    } catch (error) {
      console.error("Error fetching user:", error);  
      throw error;
    }
  }

  static async submitForm(userId, data) {
    try {
      
      const user = await User.update(
        {
          avatar: data.avatar,
          city: data.city,
          timezone: data.time,
          about: data.about,
        },
        { where: { id: userId } }
      );
      const updatedUser = await User.findByPk(userId);
      const plainUser = updatedUser.get();
      delete plainUser.hashpass;
      return plainUser;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  static async addSkillToUser(userId, skills) {
    try {
      
      const skillIds = JSON.parse(skills);
  
  
      const logskills = skillIds.map((el) =>
        UserSkill.create({
          userId,
          skillId: parseInt(el, 10),
        })
      );
      await Promise.all(logskills);
    } catch (error) {
      console.error("Error adding skill to user:", error);
      throw error;
    }

  }

  static async updateProfile(userId, data) {
    try {
      
      const user = await User.update(
        {
          name: data.name,
          avatar: data.avatar,
          city: data.city,
          timezone: data.timezone,
          about: data.about,
        },
        { where: { id: userId } }
      );
      const updatedUser = await User.findByPk(userId);
      const plainUser = updatedUser.get();
      delete plainUser.hashpass;
      return plainUser;
    } catch (error) {
      console.error("Error updating profile:", error);  
      throw error;
    }
  }

  static async updateSkills(userId, skills) {
    try {
      
      const skillIds = JSON.parse(skills);
  
      const logskills = skillIds.map((el) =>
        UserSkill.create({
          userId,
          skillId: parseInt(el, 10),
        })
      );
      await Promise.all(logskills);
    } catch (error) {
      console.error("Error updating skills:", error);
      throw error;
    }
  }

  static async getUserSkills(userId) {
    try {
      
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Skill,
            as: "skills",
            through: { attributes: [] },
          },
        ],
        attributes: ["id", "name"],
      });
      if (!user) {
        throw new Error("Пользователь не найден");
      }
      return user.skills;
    } catch (error) {
      console.error("Error getting user skills:", error);
      throw error;
    }
  }
}

module.exports = AuthService;
