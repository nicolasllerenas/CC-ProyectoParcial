// src/models/User.ts
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config/database";

// Interfaz para el modelo de usuario
export interface User {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

// DTO para retornar datos de usuario sin información sensible
export interface UserDTO {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export class UserModel {
  // Inicializar la tabla de usuarios si no existe
  static async initTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    try {
      await pool.query(query);
      console.log("Tabla de usuarios inicializada correctamente");
    } catch (error) {
      console.error("Error al inicializar tabla de usuarios:", error);
      throw error;
    }
  }

  // Buscar un usuario por email
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      return rows.length > 0 ? (rows[0] as User) : null;
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      throw error;
    }
  }

  // Buscar un usuario por ID
  static async findById(id: number): Promise<UserDTO | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, nombre, email, role FROM users WHERE id = ?",
        [id]
      );

      return rows.length > 0 ? (rows[0] as UserDTO) : null;
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      throw error;
    }
  }

  // Crear un nuevo usuario
  static async create(user: User): Promise<number> {
    try {
      // Simplificado sin hashing de contraseña
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO users (nombre, email, password, role) VALUES (?, ?, ?, ?)",
        [user.nombre, user.email, user.password, user.role || "user"]
      );

      return result.insertId;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  // Obtener todos los usuarios (opcional)
  static async findAll(): Promise<UserDTO[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, nombre, email, role FROM users"
      );

      return rows as UserDTO[];
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw error;
    }
  }
}