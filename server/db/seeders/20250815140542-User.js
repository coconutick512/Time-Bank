'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Иван Петров',
      email: 'ivan@example.com',
      hashpass: bcrypt.hashSync('123456', 10),
      balance: 1000.00,
      city: 'Москва',
      avatar: 'https://example.com/avatar.jpg',
      timezone: 'Europe/Moscow',
      about: 'Я занимаюсь разработкой сайтов и приложений',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'ivan@example.com' });
  }
};