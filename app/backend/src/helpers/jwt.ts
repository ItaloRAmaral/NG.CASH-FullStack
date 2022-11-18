import * as Jwt from "jsonwebtoken";
import { Secret, SignOptions } from "jsonwebtoken";
import { IToken, Token } from "../interfaces/token-interface";

const createToken = (username: string): IToken => {
  const secret: Secret = process.env.JWT_SECRET || "secretJWT";

  const options: SignOptions = {
    expiresIn: "24h",
    algorithm: "HS256",
  };

  const token = Jwt.sign({ username }, secret, options);

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

export const getUserByToken = (token: string): string => {
  const isTokenValid = verifyToken(token);

  const { username } = isTokenValid;

  return username as unknown as string;
}

export default createToken;
