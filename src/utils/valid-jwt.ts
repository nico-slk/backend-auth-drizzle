import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET;

const validJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No hay usuario logueado." });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token as string,
    secret as string,
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({
          msg: "Falló la autenticación del token.",
          error: err.message,
        });
      }

      (req as Request).user = decoded;

      next();
    }
  );
};

export default { validJwt };
