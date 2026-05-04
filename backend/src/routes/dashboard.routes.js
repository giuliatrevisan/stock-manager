import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /dashboard:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Dashboard
 *     summary: Dados do dashboard
 *     description: Retorna métricas agregadas de produtos e usuários
 *     responses:
 *       200:
 *         description: Dados retornados com sucesso
 */
router.get("/", dashboardController.getDashboard);

export default router;