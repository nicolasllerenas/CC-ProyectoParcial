// src/app.ts
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { SERVER_CONFIG } from "./config/config";
import { testConnection } from "./config/database";
import { UserModel } from "./models/User";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();
const PORT = SERVER_CONFIG.PORT;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/auth", authRoutes);
app.use(cors({ origin: "http://localhost:5173" }));
// Swagger
setupSwagger(app);
// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Autenticación funcionando correctamente",
    version: "1.0.0",
  });
});

// Inicializar tablas de la base de datos y probar conexión
(async () => {
  try {
    // Probar conexión a la base de datos
    await testConnection();

    // Inicializar tablas
    await UserModel.initTable();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
    process.exit(1);
  }
})();

export default app;