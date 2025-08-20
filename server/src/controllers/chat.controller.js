const ChatService = require("../services/chat.service");
const { Chat } = require("../../db/models");
const { Op } = require("sequelize");

class ChatController {
  static async createChat(req, res) {
    const { taskId } = req.body;
    try {
      const chat = await ChatService.createChat(taskId);
      res.status(201).json(chat);
    } catch (error) {
      console.log(error);
    }
  }

  static async getChats(req, res) {
    const { id } = req.params;
    try {
      const chats = await ChatService.getChats(id);
      res.status(200).json(chats);
    } catch (error) {
      res.status(404).json({ message: `Не найдено чата с id = ${id}` });
    }
  }
}
module.exports = ChatController;
