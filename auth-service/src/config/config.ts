import dotenv from "dotenv";

dotenv.config();

// Configuración JWT
export const JWT_CONFIG = {
  SECRET:
    process.env.JWT_SECRET ||
    "qwerty123qwerty123qwerty123qwerty123qwerty123qwerty123qwerty123",
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};

// Configuración del servidor
export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
};

// Configuración de la base de datos
export const DB_CONFIG = {
  HOST: process.env.DB_HOST || "auth-db",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "utec",
  DATABASE: process.env.DB_DATABASE || "bd_api_users",
  PORT: parseInt(process.env.DB_PORT || "3306"),
};
