// src/controllers/authController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  // Registro de usuario
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, password, role } = req.body;

      // Validación básica
      if (!nombre || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Faltan campos requeridos (nombre, email, password)",
        });
        return;
      }

      // Registrar el usuario
      const newUser = await AuthService.registerUser({
        nombre,
        email,
        password,
        role: role || "user",
      });

      if (!newUser) {
        res.status(409).json({
          success: false,
          message: "El email ya está registrado",
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    } catch (error) {
      console.error("Error en el controller de registro:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  // Login de usuario
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validación básica
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email y password son requeridos",
        });
        return;
      }

      // Intentar login
      const result = await AuthService.loginUser(email, password);

      if (!result) {
        res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Login exitoso",
        data: {
          token: result.token,
          user: result.user,
        },
      });
    } catch (error) {
      console.error("Error en el controller de login:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  // Obtener perfil de usuario
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.userId;

      const userProfile = await AuthService.getUserProfile(userId);

      if (!userProfile) {
        res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: userProfile,
      });
    } catch (error) {
      console.error("Error en el controller de perfil:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  // Obtener usuario por ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);

      if (isNaN(userId)) {
        res.status(400).json({
          success: false,
          message: "ID de usuario inválido",
        });
        return;
      }

      const user = await AuthService.getUserProfile(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
}