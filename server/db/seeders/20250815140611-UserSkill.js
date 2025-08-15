'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_skills', [
      { userId: 1, skillId: 1 },
      { userId: 1, skillId: 2 },
      { userId: 1, skillId: 3 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_skills', {});
  }
};