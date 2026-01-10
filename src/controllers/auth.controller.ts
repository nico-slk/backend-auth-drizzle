import { Request, Response } from "express";
import { User } from "../interfaces/auth.interface";
import { AuthService } from "../services";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const userData: User = req.body;
    try {
      const user = await this.authService.register(userData);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error interno del servidor",
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.authService.login(email, password);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Error interno del servidor",
      });
    }
  }
}
