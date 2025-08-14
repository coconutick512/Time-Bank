'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate({ User }) {
      this.belongsToMany(User, {
        through: 'UserSkills',
        foreignKey: 'skillId'
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