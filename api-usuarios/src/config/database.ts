// config/database.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Permiso } from "../entities/Permiso";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "smartstock",
  database: process.env.DB_NAME || "auth_db",
  entities: [User, Permiso],
  synchronize: true,
  logging: false,
});
