import { NextFunction, Request, Response } from "express";

export class RoleHandler {
  static check(requiredRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      // El usuario viene del middleware anterior
      const user = req.user;

      if (!user || !user.rol) {
        return res
          .status(403)
          .json({
            message: "Access denegado. No hay informacion del usuario.",
          });
      }

      if (!requiredRoles.includes(user.rol)) {
        return res
          .status(403)
          .json({ message: "Access denegado. Permisos insuficientes." });
      }

      next();
    };
  }
}
