import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
  "/register-admin",
  authMiddleware,
  authorize("admin"),
  authController.registerAdmin
);

export default router;