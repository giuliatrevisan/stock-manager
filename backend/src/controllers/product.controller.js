import * as productService from "../services/product.service.js";

/**
 * CREATE
 */
export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error) {
    if (error.message === "SKU_ALREADY_EXISTS") {
      return res.status(409).json({ message: "SKU já existe" });
    }

    if (error.message === "STOCK_NEGATIVE") {
      return res.status(400).json({ message: "Stock não pode ser negativo" });
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * GET BY ID
 */
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * LIST (PAGINATED)
 */
export const listProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const data = await productService.listProducts({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * UPDATE
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (error.message === "SKU_ALREADY_EXISTS") {
      return res.status(409).json({ message: "SKU já existe" });
    }

    if (error.message === "STOCK_NEGATIVE") {
      return res.status(400).json({ message: "Stock não pode ser negativo" });
    }

    return res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE
 */
export const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(400).json({ message: error.message });
  }
};