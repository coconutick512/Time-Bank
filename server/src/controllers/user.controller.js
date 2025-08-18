const cookieConfig = require('../config/cookieConfig');
const UserService = require('../services/user.service');
const generateTokens = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  static async signup(req, res) {
    try {
      // console.log(req.body,'---------------------------')
      const user = await UserService.createUser(req.body);

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (err) {
      console.error('❌ Signup error:', err);

      // Handle Sequelize validation errors specifically
      if (err.name === 'SequelizeValidationError') {
        const validationErrors = err.errors.map((e) => `${e.path}: ${e.message}`);
        console.error('🚫 Validation errors:', validationErrors);
        return res.status(400).json({
          message: 'Validation error',
          details: validationErrors,
        });
      }

      // Handle unique constraint errors
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.error('🚫 Unique constraint error:', err.fields);
        return res.status(409).json({
          message: 'User with this email already exists',
        });
      }

      res.status(500).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  }

  static async refresh(req, res) {
    try {
      // console.log(req)

      const { refreshToken: oldRefreshToken } = req.cookies;
      const { user } = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      console.log(user, { refreshToken: oldRefreshToken });

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = req.body;
      const { user } = await UserService.signin({ email, password });
      const { accessToken, refreshToken } = generateTokens({ user });
      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken }, console.log({ user, accessToken }));
    } catch (err) {
      if (err.message === 'Не все поля') {
        return res.status(400).json({ message: err.message });
      }
      if (err.message === 'Пользователь не найден' || err.message === 'Неверный пароль') {
        return res.status(401).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findOne(id);
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async submitForm(req, res) {
    try {
      console.log(req.body);
      const user = await UserService.submitForm(res.locals.user.id, req.body);
      const skill = await UserService.addSkillToUser(res.locals.user.id, req.body.skills);
      res.status(200).json({ user, skill });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = AuthController;
