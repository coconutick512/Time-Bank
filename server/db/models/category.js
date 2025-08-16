'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Task ,TaskCategory}) {
      this.belongsToMany(Task, {
        through: TaskCategory,
        foreignKey: 'categoryId',
        as: 'tasks'
      });
    }
  }
  
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });
  
  return Category;
};