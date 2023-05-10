'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.ENUM('created', 'processing', 'delivering', 'done'),
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.ENUM('payed', 'notpayed'),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      message: {
        type: Sequelize.STRING,
      },
      shipmentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      recipientInfo: {
        type: Sequelize.JSON(),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
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
    await queryInterface.dropTable('orders');
  }
};
