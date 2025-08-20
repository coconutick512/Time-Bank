const { Message } = require("../../db/models");

class MessagesService {
  static async createMessage(data) {
    console.log({ data });
    const message = await Message.create(data);
    return message;
  }
  static async getMessages(chatId) {
    const messages = await Message.findAll({
      where: {
        chatId,
      },
    });
    return messages;
  }
}

module.exports = MessagesService;
