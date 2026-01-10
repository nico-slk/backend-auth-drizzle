import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

const passwordHandler = (req: Request, res: Response, next: NextFunction) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  next();
};

const hashPassword = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};

export default { passwordHandler, hashPassword };
