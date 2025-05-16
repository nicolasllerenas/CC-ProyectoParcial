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

// Configuración de CORS para AWS y Docker
const corsOptions = {
  origin: [
    "http://localhost:3000", // Desarrollo local
    "http://auth-service:3000", // Docker
    "http://3.92.123.196:3000", //EC2
    "http://3.92.123.196:5173", 
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/auth", authRoutes);

// Swagger UI
setupSwagger(app);


// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Autenticación funcionando correctamente",
    version: "1.0.0",
  });
});

// Inicializar tablas y conexión a la base de datos
(async () => {
  try {
    await testConnection();
    await UserModel.initTable();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar el servidor:", error);
    process.exit(1);
  }
})();

export default app;