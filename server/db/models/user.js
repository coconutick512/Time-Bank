"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Task, Transaction, Review, Skill, UserSkill }) {
      this.hasMany(Task, { foreignKey: "creatorId", as: "createdTasks" });
      this.hasMany(Task, { foreignKey: "executorId", as: "executedTasks" });
      this.hasMany(Transaction, { foreignKey: "senderId" });
      this.hasMany(Transaction, { foreignKey: "receiverId" });
      this.hasMany(Review, { foreignKey: "authorId" });
      this.hasMany(Review, { foreignKey: "targetUserId" });
      this.belongsToMany(Skill, {
        through: UserSkill,
        foreignKey: "userId",
        as: "skills",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      hashpass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
