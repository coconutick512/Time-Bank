'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskCategory extends Model {
    static associate({ Task, Category }) {
      this.belongsTo(Task, { foreignKey: 'taskId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
    }
  }
  
  TaskCategory.init({}, {
    sequelize,
    modelName: 'TaskCategory',
    tableName: 'task_categories',
    timestamps: false
  });
  
  return TaskCategory;
};