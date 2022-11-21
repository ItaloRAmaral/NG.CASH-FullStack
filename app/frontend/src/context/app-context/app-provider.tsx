import { ReactNode, useState } from "react";
import AppContext from "./index";
import {
  fetchUserAccount,
  fetchAllTransactions,
  fetchCashOut,
} from "../../helpers/fetchApi";
import {
  IUser,
  IToken,
  ICashInAccount,
  IUserTransaction,
  IUserTransactionType
} from "../../interfaces/user-interface";
import { IFetchTransfer } from "../../interfaces/fetch-interface";

interface IProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IProps) => {
  const [userLoggedInfo, setUserLoggedInfo] = useState<IUser>({} as IUser);
  const [cashInAccount, setCashInUser] = useState<ICashInAccount>({
    username: "",
    value: "",
  } as ICashInAccount);
  const [transactionList, setTransactions] = useState<IUserTransactionType[]>([]);
  const [isMenuLogin, setIsMenuLogin] = useState(false);

  const isMenuLoginHandler = () => {
    setIsMenuLogin(!isMenuLogin);
  };

  const setUserLoggedInfoHandler = async (token: IToken): Promise<void> => {
    const userInfo = await fetchUserAccount(token);
    setUserLoggedInfo(userInfo);
    await fetchAllTransactions(token, userInfo.id);
  };

  const onChangeCashInHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "transactionValue":
        setCashInUser({
          ...cashInAccount,
          value: e.target.value,
        });
        break;
      case "cashInAccount":
        setCashInUser({
          ...cashInAccount,
          username: e.target.value,
        });
        break;
    }
  };

  const transactionHandler = async (cashIn: IFetchTransfer): Promise<any> => {
    const cashOut = await fetchCashOut(cashIn);

    return cashOut;
  };

  const getAllTransactions = async (
    token: IToken,
    userId: number
  ): Promise<void> => {
    const transactions = await fetchAllTransactions(token, userId);
    
    
    const verifyType = transactions.map((transaction: IUserTransaction) => {
      const formatedDate = new Date(transaction.createdAt)
        .toLocaleDateString("pt-BR");

      const DEBITED_ACC_ID = transaction.debitedAccountId as number;
      const DEBITED_ACC_NAME = transaction.debitedAccount
        .user.username as string;

      const CREDITED_ACC_NAME = transaction.creditedAccount
        .user.username as string;

      switch (userId) {
        case DEBITED_ACC_ID:
          return {
            transactionId: transaction.id,
            type: "cashOut",
            transactionName: CREDITED_ACC_NAME,
            style: "debited-value-table",
            value: transaction.value,
            createdAt: formatedDate,
          };
        default:
          return {
            transactionId: transaction.id,
            type: "cashIn",
            transactionName: DEBITED_ACC_NAME,
            style: "credited-value-table",
            value: transaction.value,
            createdAt: formatedDate,
          };
      }
    })
 
    setTransactions([...verifyType]);
  };

  const isInfoUpdated = async (token: IToken): Promise<any> => {
    const userInfo = await fetchUserAccount(token);
    const transactions = await fetchAllTransactions(token, userInfo.id);
    const check = { userInfo, transactions }

    return check;
  }

  const contextValue = {
    isMenuLogin,
    setIsMenuLogin,
    isMenuLoginHandler,
    userLoggedInfo,
    setUserLoggedInfoHandler,
    cashInAccount,
    onChangeCashInHandler,
    transactionHandler,
    getAllTransactions,
    transactionList,
    isInfoUpdated,
    setCashInUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
