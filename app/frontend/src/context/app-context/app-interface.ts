import { IFetchAccount, IFetchTransfer } from '../../interfaces/fetch-interface';
import {
  IUser,
  ICashInAccount,
  IToken,
  IUserTransactionType,
} from "../../interfaces/user-interface";


export interface IAppContext {
  isMenuLogin: boolean;
  setIsMenuLogin: (isLoginBtn: boolean) => void;
  isMenuLoginHandler: () => void;
  userLoggedInfo: IUser;
  setUserLoggedInfoHandler: (userLoggedInfo: IFetchAccount) => any;
  cashInAccount: ICashInAccount;
  onChangeCashInHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transactionHandler: (cashIn: IFetchTransfer) => any;
  getAllTransactions: (token: IToken, userId: number) => void;
  transactionList: IUserTransactionType[];
  isInfoUpdated: (token: IToken) => any;
  setCashInUser: (cashIn: ICashInAccount) => void;
}