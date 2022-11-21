import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interfaces/user-interface";
import UserService from "../services/user-service";
import createToken, { getUserByToken } from "../helpers/jwt";

const md5 = require("md5");

const INTERNAL_ERROR = { message: "Invalid username or password" };

export default class UserController {
  constructor(private _userService = new UserService()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body as IUser;

      const getUser = await this._userService.getUser(username);
      const checkPassword = md5(password);

      if (getUser && checkPassword === getUser.password) {
        const token = createToken(getUser.username, md5(getUser.password));

        return res.status(StatusCodes.OK).json({ token, username: getUser.username });
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid username or password" });
    } catch (error) {
      console.log("login Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR);
    }
  };

  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body as IUser;

      const createUser = await this._userService.createUser({
        username,
        password: md5(password),
      });

      if (createUser) {
        const token = createToken(username, md5(password));

        return res.status(StatusCodes.OK).json({ ...createUser, token });
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid username or password" });
    } catch (error) {
      console.log("register Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR);
    }
  };

  public getUserAccount = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { authorization } = req.headers;

      const { username } = getUserByToken(authorization as string);
      const getUserAccount = await this._userService.getUserAccount(username);

      if (getUserAccount) {
        return res.status(StatusCodes.OK).json(getUserAccount);
      }

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid username or password" });
    } catch (error) {
      console.log("getUserAccount Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR);
    }
  };
}
