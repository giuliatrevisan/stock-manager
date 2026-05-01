import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * REGISTER USER
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar usuário comum
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
 *                 example: user@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado
 *       409:
 *         description: Email já cadastrado
 */
router.post("/register", authController.register);

/**
 * LOGIN
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login do usuário
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
 *                 example: admin@system.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", authController.login);

/**
 * REGISTER ADMIN (PROTEGIDO)
 * @openapi
 * /auth/register-admin:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     summary: Criar usuário admin (somente admin pode)
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
 *                 example: newadmin@system.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Admin criado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão (não é admin)
 */
router.post(
  "/register-admin",
  authMiddleware,
  authorize("admin"),
  authController.registerAdmin
);

export default router;