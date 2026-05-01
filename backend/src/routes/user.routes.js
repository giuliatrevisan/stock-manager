import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

// 🔐 todas protegidas
router.use(authMiddleware);

/**
 * ADMIN: listar usuários
 */
router.get("/", authorize("admin"), userController.listUsers);

/**
 * ADMIN: buscar usuário por id
 */
router.get("/:id", authorize("admin"), userController.getUserById);

export default router;