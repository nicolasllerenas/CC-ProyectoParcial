// src/config/database.ts

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Creamos un pool de conexiones
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "auth-db", // Nombre del contenedor MySQL en Docker Compose
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "utec", // Debe coincidir con MYSQL_ROOT_PASSWORD
  database: process.env.DB_DATABASE || "bd_api_users", // Nombre de la BD en Docker Compose
  port: parseInt(process.env.DB_PORT || "3306"), // Puerto interno del contenedor
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