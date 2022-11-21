import * as Jwt from "jsonwebtoken";
import { Secret, SignOptions } from "jsonwebtoken";
import { IUser } from "../interfaces/user-interface"
import { IToken, Token } from "../interfaces/token-interface";

const createToken = (username: string, password: string): IToken => {
  const secret: Secret = process.env.JWT_SECRET || "secretJWT";

  const options: SignOptions = {
    expiresIn: "24h",
    algorithm: "HS256",
  };

  const token = Jwt.sign({ username, password }, secret, options);

  return token as unknown as IToken;
};3

export const verifyToken = (token: string): Token => {
  const secret: Secret = process.env.JWT_SECRET || "secretJWT";

  const isTokenValid = Jwt.verify(
    token,
    secret
  ) as Token;

  return isTokenValid as Token;
}

export const getUserByToken = (token: string): IUser => {
  const isTokenValid = verifyToken(token);

  const userInfo = isTokenValid;

  return userInfo as unknown as IUser;
}

export default createToken;
