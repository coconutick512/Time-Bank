// models/skill.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate({ User, UserSkill }) {
      this.belongsToMany(User, {
        through: UserSkill,
        foreignKey: 'skillId',
        as: 'users'
      });
    }
  }
  
  Skill.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills'
  });
  
  return Skill;
};