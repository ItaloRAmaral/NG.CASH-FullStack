import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interfaces/user-interface";
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
}
