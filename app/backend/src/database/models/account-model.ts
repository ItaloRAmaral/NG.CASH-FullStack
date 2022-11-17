import * as Sequelize from "sequelize";
import db from ".";
// import Transaction from "./transaction-model";

class Account extends Sequelize.Model {
  id!: number;
  balance!: number;
}

Account.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "accounts",
    underscored: true,
    timestamps: false,
  }
);

// Account.hasMany(Transaction, { foreignKey: "debitedAccountId", as: "debitedTransactions" });
// Account.hasMany(Transaction, { foreignKey: "creditedAccountId", as: "creditedTransactions" });

export default Account;
