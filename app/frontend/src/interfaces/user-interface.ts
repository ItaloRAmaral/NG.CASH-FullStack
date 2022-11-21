export interface IToken {
  token: string;
  username?: string;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  accountId: number;
  account: {
    balance: number;
  };
  token?: string;
}

export interface ICashInAccount {
  username: string;
  value: string | number;
}

export interface IUserTransaction {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
  debitedAccount: {
    id: number;
    user: {
      username: string;
      accountId: number;
    }
  }
  creditedAccount: {
    id: number;
    user: {
      username: string;
      accountId: number;
    }
  }
}

export interface IUserTransactionType {
  transactionId: number;
  type: string;
  transactionName: string;
  style: string
  createdAt: string;
  value: number;
}