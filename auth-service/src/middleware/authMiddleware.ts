// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/config";

interface JwtPayload {
  userId: number;
  role: string;
}

// Middleware para autenticación con JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Obtener el token de autorización del header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Token de autenticación no proporcionado",
    });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_CONFIG.SECRET) as JwtPayload;

    // Añadir el usuario decodificado a la request
    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

// Middleware para verificar roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: "No tienes permiso para acceder a este recurso",
      });
      return;
    }

    next();
  };
};