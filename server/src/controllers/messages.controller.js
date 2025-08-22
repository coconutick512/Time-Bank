const MessagesService = require("../services/messages.service");
const { Message } = require("../../db/models");
const { Op } = require("sequelize");

class MessagesController {
  static async createMessage(req, res) {
    try{

      const { chatId, text, senderId } = req.body;
      const message = await MessagesService.createMessage(chatId, text, senderId);
      res.status(201).json(message);
    }catch (error) {
      res.status(500).json({
        error: "Ошибка при создании сообщения в контроллере",
      });
    }
  }

  static async getMessages(req, res) {
    try {
      
      const { chatId } = req.params;
      const messages = await MessagesService.getMessages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Ошибка при получении сообщений в контроллере",
      });
    }
  }
}
module.exports = MessagesController;
