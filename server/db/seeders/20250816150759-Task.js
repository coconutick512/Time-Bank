'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Разработать сайт',
        description: 'Нужен лендинг для стартапа',
        hours: 20.5,
        status: 'open',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        creatorId: 1,
        created_at: new Date(),
        updated_at: new Date(),
        bookedDates: JSON.stringify([
          '2025-08-28T10:00:00.000Z',
          '2025-08-28T15:00:00.000Z',
          '2025-08-28T17:00:00.000Z',
          '2025-08-28T18:00:00.000Z',
        ]),
      },
      {
        title: 'Создать логотип',
        description: 'Лого для IT компании',
        hours: 10.0,
        status: 'assigned',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        creatorId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', {
      title: ['Разработать сайт', 'Создать логотип'],
    });
  },
};
