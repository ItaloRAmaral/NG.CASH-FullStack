import { Router } from "express";
import UserController from "../controllers/user-controller";
import UserMiddleware from "../middlewares/user-middleware";

const userRoutes = Router();

const userController = new UserController();
const userMiddleware = new UserMiddleware();

userRoutes.post(
  "/login",
  userMiddleware.credentialsValidate,
  userController.login
);

userRoutes.post(
  "/register",
  userMiddleware.credentialsValidate,
  userMiddleware.usernameValidate,
  userController.register
);

userRoutes.get(
  "/account",
  userMiddleware.tokenValidate,
  userController.getUserAccount
);

export default userRoutes;
