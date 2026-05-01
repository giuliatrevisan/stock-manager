import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";

const router = Router();

// 🔐 protege tudo
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
 * CREATE PRODUCT
 * @openapi
 * /products:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     summary: Criar produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Gamer
 *               sku:
 *                 type: string
 *                 example: MOUSE-01
 *               stock:
 *                 type: number
 *                 example: 10
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: SKU já existe
 */
router.post(
  "/",
  validate(createProductSchema),
  asyncHandler(productController.createProduct)
);

/**
 * LIST PRODUCTS (PAGINATED)
 * @openapi
 * /products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     summary: Lista produtos paginados
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Lista de produtos paginados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 pageSize:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/",
  asyncHandler(productController.listProducts)
);

/**
 * GET PRODUCT BY ID
 * @openapi
 * /products/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     summary: Buscar produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get(
  "/:id",
  asyncHandler(productController.getProductById)
);

/**
 * UPDATE PRODUCT
 * @openapi
 * /products/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     summary: Atualizar produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               stock:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: SKU já existe
 */
router.put(
  "/:id",
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct)
);

/**
 * DELETE PRODUCT (SOFT DELETE)
 * @openapi
 * /products/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     summary: Desativar produto (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto desativado
 *       404:
 *         description: Produto não encontrado
 */
router.delete(
  "/:id",
  asyncHandler(productController.deleteProduct)
);

export default router;