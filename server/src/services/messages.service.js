const { Message } = require("../../db/models");

class MessagesService {
  static async createMessage(data) {
    try{

      const message = await Message.create(data);
      return message;
    }catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }
  static async getMessages(chatId) {
    try {
      const messages = await Message.findAll({
        where: {
          chatId,
        },
      });
      return messages;
      
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}

module.exports = MessagesService;
