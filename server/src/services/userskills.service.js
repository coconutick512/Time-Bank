const { userSkill, User, Skill } = require("../../db/models/");

async function getUsersAndSkills() {
  try {
    const users = await User.findAll({
      include: { model: Skill },
    });
    return users;
  } catch (error) {
    console.log(
      `Ошибка при получении списка пользователей и навыков: ${error.message}`
    );
  }
}

// async function getUserAndSkills(userId) {
//   try {
//     const userandskills = await User.findOne({
//       where: { id: userId },1
//       include: { through: userSkill, model: Skill, as: "skills" },
//     });
//   } catch (error) {}
// }

getUsersAndSkills().then((res) => console.log(res));
