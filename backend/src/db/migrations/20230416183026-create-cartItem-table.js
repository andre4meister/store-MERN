'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart_items', {
      id: {type: Sequelize.STRING, primaryKey: true},
      quantity: {type: Sequelize.INTEGER, allowNull: false, validate: {min: 1}},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false},
      cartId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      itemId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
      down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('cart_items');
}
};
