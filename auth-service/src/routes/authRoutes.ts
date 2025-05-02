// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authenticateJWT, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

// Rutas públicas
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Rutas protegidas
router.get("/profile", authenticateJWT, AuthController.getProfile);

// Ejemplo de ruta con verificación de roles
router.get("/admin", authenticateJWT, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Acceso de administrador concedido" });
});

export default router;
