import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  AsyncHandler,
  CapitalizeNombre,
  EmailHandler,
  PasswordHandler,
} from "../utils";

const router = Router();
const controller = new AuthController();

const { emailHandler } = EmailHandler;
const { capitalizeNombre } = CapitalizeNombre;
const { asyncHandler } = AsyncHandler;
const { passwordHandler, hashPassword } = PasswordHandler;

router.post(
  "/register",
  [emailHandler, capitalizeNombre, passwordHandler, hashPassword],
  asyncHandler(controller.register.bind(controller))
);

router.post(
  "/login",
  [emailHandler, passwordHandler],
  asyncHandler(controller.login.bind(controller))
);

export default router;
