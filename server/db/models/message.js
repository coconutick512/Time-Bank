"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Chat, {
        foreignKey: "chatId",
        as: "chat",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender",
        onDelete: "CASCADE",
      });
    }
  }
  Message.init(
    {
      chatId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
