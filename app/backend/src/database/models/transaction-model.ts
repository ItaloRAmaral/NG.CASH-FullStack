import * as Sequelize from "sequelize";
import db from ".";
import Account from "./account-model";

class Transaction extends Sequelize.Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init(
  {
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
    },
    creditedAccountId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "credited_account_id",
    },
    value: {
      type: Sequelize.DECIMAL(9,2),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "created_at",
    }
  },
  {
    sequelize: db,
    modelName: "transactions",
    underscored: true,
    timestamps: false,
  }
);

Transaction.belongsTo(Account, { foreignKey: "debitedAccountId", as: "debitedAccount" });
Transaction.belongsTo(Account, { foreignKey: "creditedAccountId", as: "creditedAccount" });

Account.hasMany(Transaction, { foreignKey: "debitedAccountId", as: "debitedTransactions" });
Account.hasMany(Transaction, { foreignKey: "creditedAccountId", as: "creditedTransactions" });

export default Transaction;
