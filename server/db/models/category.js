'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Task }) {
      this.belongsToMany(Task, {
        through: 'TaskCategories',
        foreignKey: 'categoryId'
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