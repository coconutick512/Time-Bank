const MessagesService = require("../services/messages.service");
const { Message } = require("../../db/models");
const { Op } = require("sequelize");

class MessagesController {
  static async createMessage(req, res) {
    const { chatId, text, senderId } = req.body;
    const message = await MessagesService.createMessage(chatId, text, senderId);
    res.status(201).json(message);
  }

  static async getMessages(req, res) {
    const { chatId } = req.params;
    const messages = await MessagesService.getMessages(chatId);
    res.status(200).json(messages);
  }
}
module.exports = MessagesController;
