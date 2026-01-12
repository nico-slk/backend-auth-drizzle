import { Router } from "express";
import { AuthController, UserController } from "../controllers";
import {
  AsyncHandler,
  CapitalizeNombre,
  EmailHandler,
  PasswordHandler,
  ValidJwt,
} from "../utils";

const router = Router();
const authController = new AuthController();
const userController = new UserController();

const { emailHandler } = EmailHandler;
const { capitalizeNombre } = CapitalizeNombre;
const { asyncHandler } = AsyncHandler;
const { passwordHandler, hashPassword } = PasswordHandler;
const { validJwt } = ValidJwt;

router.post(
  "/register",
  [emailHandler, capitalizeNombre, passwordHandler, hashPassword],
  asyncHandler(authController.register.bind(authController))
);

router.post(
  "/login",
  [emailHandler, passwordHandler],
  asyncHandler(authController.login.bind(authController))
);

router.get(
  "/me",
  validJwt,
  asyncHandler(userController.getUser.bind(userController))
);

export default router;
