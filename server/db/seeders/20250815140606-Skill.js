'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('skills', [
      { name: 'Футбол', created_at: new Date(), updated_at: new Date() },
      { name: 'Игра на гитаре', created_at: new Date(), updated_at: new Date() },
      { name: 'Кулинария', created_at: new Date(), updated_at: new Date() },
      { name: 'Фотография', created_at: new Date(), updated_at: new Date() },
      { name: 'Рисование', created_at: new Date(), updated_at: new Date() },
      { name: 'Йога', created_at: new Date(), updated_at: new Date() },
      { name: 'Бег', created_at: new Date(), updated_at: new Date() },
      { name: 'Вождение автомобиля', created_at: new Date(), updated_at: new Date() },
      { name: 'Танцы', created_at: new Date(), updated_at: new Date() },
      { name: 'Плавание', created_at: new Date(), updated_at: new Date() },
      { name: 'Пение', created_at: new Date(), updated_at: new Date() },
      { name: 'Игра в шахматы', created_at: new Date(), updated_at: new Date() },
      { name: 'Садоводство', created_at: new Date(), updated_at: new Date() },
      { name: 'Путешествия', created_at: new Date(), updated_at: new Date() },
      { name: 'Публичные выступления', created_at: new Date(), updated_at: new Date() },
      { name: 'Программирование', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', {
      name: [
        'Футбол', 'Игра на гитаре', 'Кулинария', 'Фотография', 'Рисование',
        'Йога', 'Бег', 'Вождение автомобиля', 'Танцы', 'Плавание',
        'Пение', 'Игра в шахматы', 'Садоводство', 'Путешествия', 'Публичные выступления'
      ]
    });
  }
};