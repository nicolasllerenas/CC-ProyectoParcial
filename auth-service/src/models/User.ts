// src/models/User.ts
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config/database";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserDTO {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export class UserModel {
  // Crear las tablas si no existen
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
    await pool.query(query);
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  static async findById(id: number): Promise<UserDTO | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, nombre, email, role FROM users WHERE id = ?",
      [id]
    );
    return rows.length > 0 ? (rows[0] as UserDTO) : null;
  }

  static async create(user: User): Promise<number> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (nombre, email, password, role) VALUES (?, ?, ?, ?)",
      [user.nombre, user.email, hashedPassword, user.role || "user"]
    );

    return result.insertId;
  }
}
