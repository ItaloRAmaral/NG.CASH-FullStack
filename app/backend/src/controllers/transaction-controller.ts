import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserByToken } from "../helpers/jwt";
import {
  ITransaction,
  ITransactionUpdateBalance,
} from "../interfaces/transaction-interface";
import TransactionService from "../services/transaction-service";
import UserService from "../services/user-service";

const INTERNAL_ERROR = { message: "Internal Error" };

export default class TransactionController {
  constructor(
    private _transactionService = new TransactionService(),
    private _userService = new UserService()
  ) {}

  public deposit = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authorization } = req.headers;
      const { username, value } = req.body;
      console.log('CONTROLLER',value)

      const cashOutUsername = getUserByToken(authorization as string);
      const cashInUsername = username;

      const isCashInUserExist = await this._userService.getUserAccount(
        cashInUsername
      );
      const isCashOutUserExist = await this._userService.getUserAccount(
        cashOutUsername.username
      );

      if (!isCashInUserExist) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid chashIn username" });
      }

      const depositObj = {
        creditedAccountId: isCashInUserExist.accountId,
        debitedAccountId: isCashOutUserExist.accountId,
        value,
        createdAt: new Date(),
      };

      const deposit = await this._transactionService.deposit(
        depositObj as unknown as ITransaction
      );

      const updateCashOut = {
        id: isCashOutUserExist.accountId,
        balance: isCashOutUserExist.account.balance - value,
      } as unknown as ITransactionUpdateBalance;

      const updateCashIn = {
        id: isCashInUserExist.accountId,
        balance: isCashInUserExist.account.balance + value,
      } as unknown as ITransactionUpdateBalance;

      await this._userService.updateUserBalance(updateCashOut);
      await this._userService.updateUserBalance(updateCashIn);

      return res.status(StatusCodes.OK).json(deposit);
    } catch (error) {
      console.log("deposit Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR);
    }
  };

  public getTransactions = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { accountId } = req.params;

      const transactions = await this._transactionService.getTransactions(accountId);

      if (transactions.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "This user has no transactions yet" });
      }

      return res.status(StatusCodes.OK).json(transactions);

    } catch (error) {
      console.log("getTransactions Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR);
    }
  };
}
