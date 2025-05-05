// src/config/swagger.ts
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticación",
      version: "1.0.0",
      description: "Documentación con Swagger para tu microservicio",
    },
    servers: [
      {
        url: "http://localhost:3000", // Cambia si usas otro puerto
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // O donde defines tus rutas
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
