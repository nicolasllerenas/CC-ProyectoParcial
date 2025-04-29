// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Esto obtiene el token de autorización del header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Añadimos el usuario decodificado a la request
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

// Middleware para verificar roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({
        message: "No tienes permiso para acceder a este recurso",
      });
      return;
    }

    next();
  };
};
