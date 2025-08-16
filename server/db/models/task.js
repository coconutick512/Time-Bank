'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User, Transaction, Review, Category ,TaskCategory}) {
      this.belongsTo(User, { 
        foreignKey: 'creatorId',
        as: 'creator'
      });
      
      this.belongsTo(User, { 
        foreignKey: 'executorId',
        as: 'executor'
      });
      
      this.hasOne(Transaction, { foreignKey: 'taskId' });
      this.hasOne(Review, { foreignKey: 'taskId' });
      this.belongsToMany(Category, {
        through: TaskCategory,
        foreignKey: 'taskId',
        as: 'categories'
      });
    }
  }
  
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    hours: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'assigned', 'completed', 'canceled'),
      defaultValue: 'open'
    },
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return Task;
};