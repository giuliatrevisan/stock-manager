import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

//  todas protegidas
router.use(authMiddleware);

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
 * LIST USERS (ADMIN ONLY)
 * @openapi
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Listar usuários (somente admin)
 *     description: |
 *       Retorna a lista de usuários cadastrados no sistema.
 *       
 *        APENAS administradores podem acessar esta rota.
 *       
 *        É possível filtrar usuários por role:
 *       - `admin` → retorna apenas administradores
 *       - `user` → retorna apenas usuários comuns
 *       - sem filtro → retorna todos os usuários
 *     parameters:
 *       - in: query
 *         name: role
 *         required: false
 *         description: Filtrar usuários por tipo de role
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [admin, user]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Token não enviado ou inválido
 *       403:
 *         description: Acesso negado (apenas admin)
 */
router.get(
  "/",
  authorize("admin"),
  userController.listUsers
);

/**
 * GET USER BY ID (ADMIN ONLY)
 * @openapi
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Buscar usuário por ID
 *     description: |
 *       Retorna os dados de um usuário específico.
 *       
 *       APENAS administradores podem acessar esta rota.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão (apenas admin)
 */
router.get(
  "/:id",
  authorize("admin"),
  userController.getUserById
);

export default router;