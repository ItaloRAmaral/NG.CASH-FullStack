'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "debited_account_id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "credited_account_id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: "created_at",
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  },
};
