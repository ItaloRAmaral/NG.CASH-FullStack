import TransactionModel from "../database/models/transaction-model";
import AccountModel from "../database/models/account-model";
import UserModel from "../database/models/user-model";
import {
  ITransaction,
  AllTransactions,
} from "../interfaces/transaction-interface";
const Op = require("Sequelize").Op;

export default class TransactionService {
  public transactionModel = TransactionModel;

  public deposit = async (depositObj: ITransaction): Promise<ITransaction> => {
    const deposit = await this.transactionModel.create(depositObj);

    if (!deposit) {
      throw new Error("Internal Error");
    }

    return deposit;
  };

  public getTransactions = async (id: string): Promise<AllTransactions[]> => {
    const transactions = await this.transactionModel.findAll({
      where: { [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }] },
      include: [
        {
          model: AccountModel,
          include: [
            {
              model: UserModel,
              as: "user",
              attributes: ["username", "accountId"],
            },
          ],
          as: "debitedAccount",
          attributes: ["id"],
        },
        {
          model: AccountModel,
          include: [
            {
              model: UserModel,
              as: "user",
              attributes: ["username", "accountId"],
            },
          ],
          as: "creditedAccount",
          attributes: ["id"],
        },
      ],
    });

    if (!transactions) {
      throw new Error("Internal Error");
    }

    return transactions as unknown as AllTransactions[];
  };
}
