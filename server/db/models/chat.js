"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // Связь с задачей (Task)
      this.belongsTo(models.Task, {
        foreignKey: "taskId",
        as: "task",
        onDelete: "CASCADE",
      });
      // (Опционально) связь с сообщениями
      this.hasMany(models.Message, {
        foreignKey: "chatId",
        as: "messages",
        onDelete: "CASCADE",
      });
    }
  }

  Chat.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "Chats", // проверьте, чтобы было совпадение с миграцией
      timestamps: true,
    }
  );

  return Chat;
};
