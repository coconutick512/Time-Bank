'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('task_categories', [
      {
        taskId: 1, 
        categoryId: 1, 
      },
      {
        taskId: 1,
        categoryId: 2, 
      },
      {
        taskId: 2, 
        categoryId: 2,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('task_categories', {
      task_id: [1, 2]
    });
  }
};