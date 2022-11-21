export interface IFetchLogin {
  username: string;
  password: string;
}

export interface IFetchAccount {
  token: string;
}

export interface IFetchTransfer extends IFetchAccount {
  value: number;
  username: string;
}

