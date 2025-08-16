"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    static associate({ User, Skill }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Skill, { foreignKey: "skillId" });
    }
  }

  UserSkill.init(
    {
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // skill_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      sequelize,
      modelName: "UserSkill",
      tableName: "user_skills",
      timestamps: false,
    }
  );

  return UserSkill;
};
