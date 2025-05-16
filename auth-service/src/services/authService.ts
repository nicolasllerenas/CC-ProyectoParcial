// src/services/authService.ts
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { User, UserDTO, UserModel } from "../models/User";
import { JWT_CONFIG } from "../config/config";

export class AuthService {
  // Registrar un nuevo usuario
  static async registerUser(userData: User): Promise<UserDTO | null> {
    try {
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) return null;

      const randomRole = Math.random() < 0.8 ? 'user' : 'admin';

      const userId = await UserModel.create({
        ...userData,
        role: randomRole // Asignar el rol generado
      });
      
      return {
        id: userId,
        nombre: userData.nombre,
        email: userData.email,
        role: randomRole,
      };
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      throw error;
    }
  }

  // Login de usuario
  static async loginUser(
    email: string,
    password: string
  ): Promise<{ token: string; user: UserDTO } | null> {
    try {
      const user = await UserModel.findByEmail(email);
      if (!user || password !== user.password) return null;

      // Generar token directamente sin variables intermedias
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        JWT_CONFIG.SECRET,
        { algorithm: "HS512", expiresIn: "1h" } 
      );

      return {
        token,
        user: {
          id: user.id!,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  }

  // Obtener perfil de usuario
  static async getUserProfile(userId: number): Promise<UserDTO | null> {
    try {
      return await UserModel.findById(userId);
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
      throw error;
    }
  }
}
