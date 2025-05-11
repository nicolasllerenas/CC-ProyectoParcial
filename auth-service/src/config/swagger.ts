// src/config/swagger.ts
import { Express } from "express";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Aquí configuramos los servidores para diferentes entornos
const servers = [
  {
    url: "http://localhost:3000",
    description: "Entorno Local",
  },
  {
    url: "http://auth-service:3000",
    description: "Docker Network",
  },
  {
    url: "http://3.92.123.196:3000", // Reemplazamos con la IP pública de EC2
    description: "AWS EC2",
  },
];

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Autenticación",
      version: "1.0.0",
      description:
        "Documentación Swagger para el microservicio de autenticación",
    },
    servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}