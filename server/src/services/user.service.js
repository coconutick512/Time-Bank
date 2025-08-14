const { User,Score } = require('../../db/models/');
const bcrypt = require('bcrypt');

class AuthService {
  static async createUser({ email, password, name ,nickname}) {
      if (!email || !password || !name ) {
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

  static findOne (id){
    return Score.findAll({where:{userId: id}})
  }
}

module.exports = AuthService;