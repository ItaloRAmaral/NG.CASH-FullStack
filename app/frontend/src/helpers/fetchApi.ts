import { IFetchLogin, IFetchTransfer } from "../interfaces/fetch-interface";
import { IToken, IUser, IUserTransaction } from "../interfaces/user-interface";

const APP_JSON = "application/json";

export const fetchLogin = async (user: IFetchLogin): Promise<any> => {
  const FETCH_URL = "http://localhost:3001/user/login";

  try {
    const response = await fetch(FETCH_URL, {
      method: "POST",
      headers: { "Content-Type": APP_JSON },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return data as IToken
  } catch (error) {
    console.error(error);
  }
}

export const fetchRegister = async (user: IFetchLogin): Promise<any> => {
  const FETCH_URL = "http://localhost:3001/user/register";

  try {
    const response = await fetch(FETCH_URL, {
      method: "POST",
      headers: { "Content-Type": APP_JSON },
      body: JSON.stringify(user),
    });
                                                
    const data = await response.json();

    return data as IUser
  } catch (error) {
    console.error(error);
  }
}

export const fetchUserAccount = async (user: IToken): Promise<any> => {
  const FETCH_URL = "http://localhost:3001/user/account";

  const { token } = user;
  try {
      const response = await fetch(FETCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": APP_JSON,
        authorization: `${token}`,
      },
    });

    const data = await response.json();

    return data as IUser;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllTransactions = async (user: IToken, userId: number): Promise<any> => {
  const FETCH_URL = `http://localhost:3001/transaction/${userId}`;

  const { token } = user;

  try {
      const response = await fetch(FETCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": APP_JSON,
        authorization: `${token}`,
      },
    });

    const data = await response.json();

    return data as IUser;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCashOut = async (cashIn: IFetchTransfer): Promise<any> => {
  const FETCH_URL = `http://localhost:3001/transaction/deposit`;
  const { token, value, username } = cashIn;

  try {
    const response = await fetch(FETCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": APP_JSON,
        authorization: `${token}`,
      },
      body: JSON.stringify({username, value: Number(value)}),

    });

    const data = await response.json();

    return data as IUserTransaction;
  } catch (error) {
    console.error(error);
  }
};
