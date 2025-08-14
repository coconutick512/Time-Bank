'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate({ User, Task }) {
      this.belongsTo(User, { 
        foreignKey: 'senderId',
        as: 'sender'
      });
      
      this.belongsTo(User, { 
        foreignKey: 'receiverId',
        as: 'receiver'
      });
      
      this.belongsTo(Task, { foreignKey: 'taskId' });
    }
  }
  
  Transaction.init({
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('task_payment', 'transfer', 'bonus'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
  return Transaction;
};