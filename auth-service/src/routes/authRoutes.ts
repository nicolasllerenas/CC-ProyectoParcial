// src/routes/authRoutes.ts
import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authenticateJWT, authorizeRoles } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: user
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Faltan campos requeridos
 *       409:
 *         description: Email ya registrado
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso y token generado
 *       400:
 *         description: Datos incompletos
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get("/profile", authenticateJWT, AuthController.getProfile);

/**
 * @swagger
 * /auth/user/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/user/:id", authenticateJWT, AuthController.getUserById);

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Ruta protegida solo para administradores
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso concedido
 *       403:
 *         description: Acceso denegado
 */
router.get("/admin", authenticateJWT, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Acceso de administrador concedido",
  });
});

export default router;