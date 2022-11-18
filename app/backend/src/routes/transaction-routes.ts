import { Router } from "express";
import TransactionController from "../controllers/transaction-controller";
import TransactionMiddleware from "../middlewares/transaction-middleware";
import TokenMiddleware from "../middlewares/token-middleware";

const transactionRoutes = Router();

const transactionController = new TransactionController();
const transactionMiddleware = new TransactionMiddleware();
const tokenMiddleware = new TokenMiddleware();

transactionRoutes.post(
  "/deposit",
  transactionMiddleware.cashOutValidate,
  transactionMiddleware.checkBalance,
  transactionController.deposit
);

transactionRoutes.get(
  "/:accountId",
  tokenMiddleware.tokenValidate,
  transactionController.getTransactions
);

export default transactionRoutes;
