export interface ITransaction {
  id?: number;
  creditedAccountId: number;
  debitedAccountId: number;
  value: number;
  createdAt: Date;
}

export interface ITransactionUpdateBalance {
  id: number;
  balance: number;
}

export interface AllTransactions extends ITransaction {
  debitedAccount: {
    id: number;
    user: {
      username: string;
      accountId: number;
    };
  };
  creditedAccount: {
    id: number;
    user: {
      username: string;
      accountId: number;
    };
  }
}