export interface IUser {
  id?: number;
  username: string;
  password: string;
  accountId?: number;
}

export interface IAccount {
  id?: number;
  balance: number;
}

export interface IUserAccount extends IUser {
  account: IAccount;
}
