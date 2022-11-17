import { Request, Response, NextFunction } from "express";
import * as Jwt from "jsonwebtoken";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interfaces/user-interface";
import { Token } from "../interfaces/token-interface";
import UserModel from "../database/models/user-model";

export default class UserMiddleware {
  public model = UserModel;

  public credentialsValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body as IUser;

      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      const testPassword = passwordRegex.test(password);

      if (username.length < 3) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Username must be at least 3 characters long" });
      }

      if (!testPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number",
        });
      }

      next();
    } catch (error) {
      console.log("credentialsValidate Error:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public usernameValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username } = req.body as IUser;

      const user = await this.model.findOne({ where: { username }, raw: true });

      if (user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Username already exists" });
      }

      next();
    } catch (error) {
      console.log("usernameValidate Error:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public tokenValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorization } = req.headers;
      const { username } = req.body as IUser;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Not Found" });
      }

      const isTokenValid = Jwt.verify(
        authorization,
        process.env.JWT_SECRET || "secretJWT"
      ) as Token;

      const isUserExist = await this.model.findOne({
        where: { username: isTokenValid.username },
        raw: true,
      });

      if (!isUserExist) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Must be a valid token" });
      }

      if (isUserExist.username !== username) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Wrong username" });
      }

      next();
    } catch (error) {
      console.log("tokenValidate Error:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Must be a valid token" });
    }
  };
}
