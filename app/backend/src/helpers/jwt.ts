import * as jwt from "jsonwebtoken";
import { Secret, SignOptions } from "jsonwebtoken";
import { IToken } from "../interfaces/token-interface";

const createToken = (username: string): IToken => {
  const secret: Secret = process.env.JWT_SECRET || "secretJWT";

  const options: SignOptions = {
    expiresIn: "24h",
    algorithm: "HS256",
  };

  const token = jwt.sign({ username }, secret, options);

  return token as unknown as IToken;
};

export default createToken;
