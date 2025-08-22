const { Chat } = require("../../db/models");

class ChatService {
  static async createChat(taskId) {
    try {
      
      const chat = await Chat.create({ taskId: taskId });
      return chat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }
  static async getChats(taskId) {
    try {
      
      const chats = await Chat.findOne({
        where: {
          taskId,
        },
      });
      return chats;
    } catch (error) {
      console.error("Error fetching chats:", error);  
      throw error;
    }
  }
}

module.exports = ChatService;
