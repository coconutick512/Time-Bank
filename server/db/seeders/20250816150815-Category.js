'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Программирование' },
      { name: 'Дизайн' },
      { name: 'Копирайтинг' },
      { name: 'Маркетинг' },
      { name: 'Фотография' },
      { name: 'Музыка' },
      { name: 'Спорт' },
      { name: 'Образование' },
      { name: 'Путешествия' },
      { name: 'Здоровье и фитнес' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: [
        'Программирование',
        'Дизайн',
        'Копирайтинг',
        'Маркетинг',
        'Фотография',
        'Музыка',
        'Спорт',
        'Образование',
        'Путешествия',
        'Здоровье и фитнес',
      ],
    });
  },
};
