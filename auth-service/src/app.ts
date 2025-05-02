// src/app.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { UserModel } from "./models/User";

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar tablas de la base de datos
(async () => {
  try {
    await UserModel.initTable();
    console.log("Tablas inicializadas");
  } catch (error) {
    console.error("Error:", error);
  }
})();

// Rutas
app.use("/auth", authRoutes);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({ message: "Microservicio de Autenticación está funcionando" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}
export default app;
