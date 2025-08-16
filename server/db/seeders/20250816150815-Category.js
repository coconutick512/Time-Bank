'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Программирование',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Дизайн',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Копирайтинг',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Маркетинг',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: ['Программирование', 'Дизайн', 'Копирайтинг', 'Маркетинг']
    });
  }
};