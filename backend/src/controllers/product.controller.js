import * as productService from "../services/product.service.js";
/**
 * CREATE
 */
export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  return res.status(201).json(product);
};

/**
 * GET BY ID
 */
export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return res.status(200).json(product);
};

/**
 * LIST
 */
export const list = async (req, res) => {
  const { page, limit, search, status } = req.query;

  const result = await productService.listProducts({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    search: search || "",
    status: status || "active",
    user: req.user, 
  });

  return res.json(result);
};
/**
 * UPDATE
 */
export const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body
  );

  return res.status(200).json(product);
};

/**
 * DELETE
 */
export const deleteProduct = async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  return res.status(200).json(result);
};