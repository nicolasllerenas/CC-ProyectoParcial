// src/controllers/authController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { User } from "../models/User";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, password, role } = req.body;

      // Validación básica
      if (!nombre || !email || !password) {
        res.status(400).json({ message: "Todos los campos son requeridos" });
        return;
      }

      // Crear usuario
      const userData: User = { nombre, email, password, role: role || "user" };
      const newUser = await AuthService.registerUser(userData);

      if (!newUser) {
        res.status(409).json({ message: "El usuario ya existe" });
        return;
      }

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: newUser,
      });
    } catch (error) {
      console.error("Error en el controlador de registro:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validación básica
      if (!email || !password) {
        res.status(400).json({ message: "Email y contraseña son requeridos" });
        return;
      }

      // Login
      const result = await AuthService.loginUser(email, password);

      if (!result) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      res.status(200).json({
        message: "Login exitoso",
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      console.error("Error en el controlador de login:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // El ID del usuario viene del middleware de autenticación
      const userId = (req as any).user.id;

      const userProfile = await AuthService.getUserProfile(userId);

      if (!userProfile) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json({
        message: "Perfil de usuario obtenido exitosamente",
        user: userProfile,
      });
    } catch (error) {
      console.error("Error en el controlador de perfil:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
