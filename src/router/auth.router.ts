import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();
const controller = new AuthController();

router.post("/register", asyncHandler(controller.register.bind(controller)));

export default router;
