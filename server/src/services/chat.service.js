const { Chat } = require("../../db/models");

class ChatService {
  static async createChat(taskId) {
    const chat = await Chat.create({ taskId: taskId });
    return chat;
  }
  
  static async getChats(taskId) {
    console.log("_________________", taskId);
    let chat = await Chat.findOne({
      where: {
        taskId,
      },
    });
    
    // If chat doesn't exist, create it
    if (!chat) {
      chat = await Chat.create({ taskId: taskId });
    }
    
    return chat;
  }
}

module.exports = ChatService;
