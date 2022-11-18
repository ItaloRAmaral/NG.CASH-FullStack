import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../helpers/jwt";
import { Token } from "../interfaces/token-interface";
import { IUser } from "../interfaces/user-interface";
import UserModel from "../database/models/user-model";
import UserService from "../services/user-service";

export default class TransactionMiddleware {
  public model = UserModel;

  constructor(private _userService = new UserService()) {}

  public checkBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { value } = req.body;
      const { authorization } = req.headers;

      const isTokenValid = verifyToken(authorization as string) as Token;
      const cashOutUsername = isTokenValid.username as unknown as string;

      const isCashOutUser = await this._userService.getUserAccount(
        cashOutUsername
      );

      if (isCashOutUser.account.balance < value) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Insufficient funds" });
      }

      next();
    } catch (error) {
      console.log("checkBalance Error:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public cashOutValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorization } = req.headers;
      const { username } = req.body as IUser;

      const isTokenValid = verifyToken(authorization as string) as Token;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Token Not Found" });
      }

      const isUserExist = (await this.model.findOne({
        where: { username: isTokenValid.username },
      })) as IUser;

      if (isUserExist.username === username) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "It's not possible to cash in your own account" });
      }

      next();
    } catch (error) {
      console.log("usernameTokenValidate Error:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Must be a valid token" });
    }
  };
}