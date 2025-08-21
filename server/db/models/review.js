'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User, Task }) {
      this.belongsTo(User, {
        foreignKey: 'authorId',
        as: 'author'
      });
      
      this.belongsTo(User, {
        foreignKey: 'targetUserId',
        as: 'targetUser'
      });
      
      this.belongsTo(Task, { foreignKey: 'taskId' });
    }
  }
  
  Review.init({
    rating: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 }
    },
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });
  
  return Review;
};