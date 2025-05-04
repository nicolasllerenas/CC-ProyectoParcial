// src/config/database.ts

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool de conexiones
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "auth_db",
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Función para probar la conexión a la base de datos
export const testConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión a la base de datos establecida correctamente");
    connection.release();
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
};