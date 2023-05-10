'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_infos', {
      id: {type: Sequelize.STRING, primaryKey: true},
      title: {type: Sequelize.STRING, allowNull: false},
      description: {type: Sequelize.STRING, allowNull: false},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false},
      itemId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_infos');
  }
};