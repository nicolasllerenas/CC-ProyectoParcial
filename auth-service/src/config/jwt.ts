// src/config/jwt.ts
export const JWT_SECRET = process.env.JWT_SECRET || "smartstock_secret_key";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
