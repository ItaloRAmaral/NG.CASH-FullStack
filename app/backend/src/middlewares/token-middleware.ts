import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserByToken } from "../helpers/jwt";
import { IUser } from "../interfaces/user-interface";
import UserModel from "../database/models/user-model";

export default class TokenMiddleware {
  public model = UserModel;

  public tokenValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Not Found" });
      }

      const userByToken = getUserByToken(authorization as string);

      const isUserExist = await this.model.findOne({
        where: { username: userByToken.username },
        raw: true,
      });

      if (!isUserExist) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Must be a valid token" });
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