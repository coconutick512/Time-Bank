'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('skills', [
      { name: 'JavaScript', created_at: new Date(), updated_at: new Date() },
      { name: 'Node.js', created_at: new Date(), updated_at: new Date() },
      { name: 'Sequelize', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', {
      name: ['JavaScript', 'Node.js', 'Sequelize']
    });
  }
};