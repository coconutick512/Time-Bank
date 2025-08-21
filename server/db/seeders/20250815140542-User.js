'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Иван Петров',
        email: 'ivan@example.com',
        hashpass: bcrypt.hashSync('123456', 10),
        balance: 10.0,
        city: 'Москва',
        role: 'admin',
        avatar: 'https://example.com/avatar.jpg',
        timezone: 'Europe/Moscow',
        about: 'Я занимаюсь разработкой сайтов и приложений',
        created_at: new Date(),
        updated_at: new Date(),
        availableDates: JSON.stringify(['2025-08-25T10:00:00.000Z']),
      },
      {
        name: 'Анна Смирнова',
        email: 'anna@example.com',
        hashpass: bcrypt.hashSync('qwerty', 10),
        balance: 750.0,
        city: 'Санкт-Петербург',
        avatar: 'https://example.com/avatar2.jpg',
        timezone: 'Europe/Moscow',
        about: 'Графический дизайнер, люблю минимализм и яркие цвета',
        created_at: new Date(),
        updated_at: new Date(),
        availableDates: JSON.stringify(['2025-08-26T14:00:00.000Z']),
      },
      {
        name: 'Дмитрий Кузнецов',
        email: 'dmitry@example.com',
        hashpass: bcrypt.hashSync('password', 10),
        balance: 500.0,
        city: 'Новосибирск',
        avatar: 'https://example.com/avatar3.jpg',
        timezone: 'Asia/Novosibirsk',
        about: 'Маркетолог, специализируюсь на digital продвижении',
        created_at: new Date(),
        updated_at: new Date(),
        availableDates: JSON.stringify([
          '2025-08-27T09:00:00.000Z',
          '2025-08-27T18:00:00.000Z',
        ]),
      },
      {
        name: 'Екатерина Волкова',
        email: 'ekaterina@example.com',
        hashpass: bcrypt.hashSync('katya2025', 10),
        balance: 1200.0,
        city: 'Казань',
        avatar: 'https://example.com/avatar4.jpg',
        timezone: 'Europe/Moscow',
        about: 'Копирайтер и автор статей для блогов и соцсетей',
        created_at: new Date(),
        updated_at: new Date(),
        availableDates: JSON.stringify(['2025-08-28T11:30:00.000Z']),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: [
        'ivan@example.com',
        'anna@example.com',
        'dmitry@example.com',
        'ekaterina@example.com',
      ],
    });
  },
};
