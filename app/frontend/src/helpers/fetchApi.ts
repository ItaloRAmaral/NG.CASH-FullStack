import { IFetchLogin } from "../interfaces/fetch-interface";

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
    console.log('fetchLogin', data);

    return data
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

    return data
  } catch (error) {
    console.error(error);
  }
}