// src/services/authService.ts
import jwt from "jsonwebtoken";
import { User, UserDTO, UserModel } from "../models/User";
import { comparePassword } from "../utils/passwordUtils";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

export class AuthService {
  static async registerUser(userData: User): Promise<UserDTO | null> {
    try {
      // Esto verifica si el usuario ya existe
      const existingUser = await UserModel.findByEmail(userData.email);
      if (existingUser) {
        return null;
      }

      // Creamos el usuario
      const userId = await UserModel.create(userData);

      // Retornamos los datos del usuario sin la contraseña
      return {
        id: userId,
        nombre: userData.nombre,
        email: userData.email,
        role: userData.role || "user",
      };
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      throw error;
    }
  }

  static async loginUser(
    email: string,
    password: string
  ): Promise<{ token: string; user: UserDTO } | null> {
    try {
      // Buscamos el usuario por email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return null;
      }

      // Verificamos la contraseña
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      // Generamos el token JWT
const token = jwt.sign(
  { userId: user.id, rol: user.role }, // Payload
  process.env.JWT_SECRET as string, // Clave secreta (asegúrate de que es string)
  { expiresIn: "1h" } // Opciones
);

      // Esto retorna el token y los datos del usuario
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
      console.error("Error en el login de usuario:", error);
      throw error;
    }
  }

  static async getUserProfile(userId: number): Promise<UserDTO | null> {
    try {
      return await UserModel.findById(userId);
    } catch (error) {
      console.error("Error al obtener perfil de usuario:", error);
      throw error;
    }
  }
}
