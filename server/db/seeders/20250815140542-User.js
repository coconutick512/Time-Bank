'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Иван Петров',
      email: 'ivan@example.com',
      hashpass: '$2a$10$examplehash123',
      balance: 1000.00,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'ivan@example.com' });
  }
};