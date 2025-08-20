const { Chat } = require("../../db/models");

class ChatService {
  static async createChat(taskId) {
    const chat = await Chat.create({ taskId: taskId });
    return chat;
  }
  static async getChats(taskId) {
    console.log("_________________", taskId);
    const chats = await Chat.findOne({
      where: {
        taskId,
      },
    });
    return chats;
  }
}

module.exports = ChatService;
