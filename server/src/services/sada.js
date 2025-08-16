const { User, Skill } = require('../../db/models/');

class SadaService{

    static async getUserWithSkills (){
      try {
        const user = await User.findByPk(1, {
          include: [
            {
              model: Skill,
              as: 'skills',
              attributes: ['name'],
              required: true,
            },
          ],
        });
        console.log(user.skills);
        
        return user;
      } catch (error) {
        console.error('Error fetching user with skills:', error);
        throw error;
      }
    };
}
module.exports = SadaService;
