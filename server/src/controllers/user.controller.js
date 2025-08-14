const cookieConfig = require("../config/cookieConfig");
const UserService = require("../services/user.service");
const generateTokens = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  static async signup(req, res) {
    try {
        // console.log(req.body,'---------------------------')
      const user = await UserService.createUser(req.body);

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json({ user: user, accessToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  }

  static async refresh(req, res) {
    try {
        // console.log(req)
        
      const { refreshToken: oldRefreshToken } = req.cookies;
      const { user } = jwt.verify(
        oldRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      console.log(user,{refreshToken: oldRefreshToken})

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
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
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json({ user, accessToken },console.log({ user, accessToken }));
    } catch (err) {
      if (err.message === "Не все поля") {
        return res.status(400).json({ message: err.message });
      }
      if (
        err.message === "Пользователь не найден" ||
        err.message === "Неверный пароль"
      ) {
        return res.status(401).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    }
  }

   static async findOne(req, res){
    try {
      const {id} = req.params;
      const user = await UserService.findOne(id)
      res.send(user)
    } catch (error) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
   }
}

module.exports = AuthController;
