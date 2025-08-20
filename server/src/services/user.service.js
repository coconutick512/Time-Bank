const { User, UserSkill, Skill } = require('../../db/models/');
const bcrypt = require('bcrypt');

class AuthService {
  static async createUser({ email, password, name }) {
    if (!email || !password || !name) {
      throw new Error('Не все поля');
    }

    const hashpass = await bcrypt.hash(password, 10);

    const user = await User.create({ email, name, hashpass });
    if (!user) {
      throw new Error('Не смог создать user');
    }

    const plainUser = user.get();
    delete plainUser.hashpass;

    return plainUser;
  }

  //   static async findUserByEmail(email) {
  //     if (!email) return null;
  //     const artist = await User.findOne({ where: { email } });
  //     return artist ? artist.get() : null;
  //   }

  static async checkPassword(password, hashpass) {
    return bcrypt.compare(password, hashpass);
  }

  static async signin({ email, password }) {
    if (!email || !password) {
      throw new Error('Не все поля');
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const isMatch = await bcrypt.compare(password, user.hashpass);
    if (!isMatch) {
      throw new Error('Неверный пароль');
    }
    const plainUser = user.get();
    delete plainUser.hashpass;
    return { user: plainUser };
  }

  static async findOne(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const plainUser = user.get();
    delete plainUser.hashpass;
    return { user: plainUser };
  }

  static async submitForm(userId, data) {
    const user = await User.update(
      {
        avatar: data.avatar,
        city: data.city,
        timezone: data.time,
        about: data.about,
      },
      { where: { id: userId } },
    );
    const updatedUser = await User.findByPk(userId);
    const plainUser = updatedUser.get();
    delete plainUser.hashpass;
    return plainUser;
  }

  static async addSkillToUser(userId, skills) {
    const skillIds = JSON.parse(skills)
    
    console.log(skills);

    console.log(skillIds, '------');

    const logskills = skillIds.map((el) =>
      UserSkill.create({
        userId,
        skillId: parseInt(el, 10),
      }),
    );
    await Promise.all(logskills);
  }

  static async updateProfile(userId, data) {
    const user = await User.update(
      {
        avatar: data.avatar,
        city: data.city,
        timezone: data.time,
        about: data.about,
      },
      { where: { id: userId } },
    );
    const updatedUser = await User.findByPk(userId);
    const plainUser = updatedUser.get();
    delete plainUser.hashpass;
    return plainUser;
  }

  static async updateSkills(userId, skills) {
    console.log(skills);
    const skillIds = JSON.parse(skills);
    console.log(skillIds, '------');

    const logskills = skillIds.map((el) =>
      UserSkill.create({
        userId,
        skillId: parseInt(el, 10),
      }),
    );
    await Promise.all(logskills);
  }

  static async getUserSkills(userId) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Skill,
          as: 'skills',
          through: { attributes: [] },
        },
      ],
      attributes: ['id', 'name'],
    });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    return user.skills;
  }
}

module.exports = AuthService;
