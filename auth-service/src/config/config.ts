import dotenv from "dotenv";

dotenv.config();

// Configuración JWT
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "default_secret_key_for_development",
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};

// Configuración del servidor
export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
};

// Configuración de la base de datos
export const DB_CONFIG = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "password",
  DATABASE: process.env.DB_DATABASE || "auth_db",
  PORT: parseInt(process.env.DB_PORT || "3306"),
};
