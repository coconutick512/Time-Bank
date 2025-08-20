'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Программирование'
      },
      {
        name: 'Дизайн'
      },
      {
        name: 'Копирайтинг'
      },
      {
        name: 'Маркетинг'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: ['Программирование', 'Дизайн', 'Копирайтинг', 'Маркетинг']
    });
  }
};