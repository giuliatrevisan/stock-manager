import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";

const router = Router();

// 🔐 todas as rotas protegidas
router.use(authMiddleware);

/**
 * CREATE
 */
router.post(
  "/",
  validate(createProductSchema),
  productController.createProduct
);

/**
 * LIST
 */
router.get("/", productController.listProducts);

/**
 * GET BY ID
 */
router.get("/:id", productController.getProductById);

/**
 * UPDATE
 */
router.put(
  "/:id",
  validate(updateProductSchema),
  productController.updateProduct
);

/**
 * DELETE
 */
router.delete("/:id", productController.deleteProduct);

export default router;