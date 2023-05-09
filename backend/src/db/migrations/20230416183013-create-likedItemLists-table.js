'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('liked_items', {
      id: {type: Sequelize.STRING, primaryKey: true},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false},
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },
      down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('liked_items');
}
};
