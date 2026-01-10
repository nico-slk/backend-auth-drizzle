import { NextFunction, Request, Response } from "express";

const capitalizeNombre = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { nombre } = req.body;

  if (!nombre) {
    throw new Error("Invalid input. Debe ser una cadena no vacía.");
  }

  req.body.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();

  next();
};

export default { capitalizeNombre };
