// src/config/database.ts
import { createPool, Pool } from "mysql2/promise";

export const pool: Pool = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "smartstock",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
