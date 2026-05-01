import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/appError.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async ({ name, sku, stock, active }) => {
  if (stock === null || stock === undefined) {
    throw new AppError("STOCK_REQUIRED", 400);
  }

  if (stock < 0) {
    throw new AppError("STOCK_NEGATIVE", 400);
  }

  if (!sku || !name) {
    throw new AppError("NAME_AND_SKU_REQUIRED", 400);
  }

  const normalizedSku = sku.toLowerCase();

  const existing = await prisma.product.findFirst({
    where: {
      sku: {
        equals: normalizedSku,
        mode: "insensitive",
      },
    },
  });

  if (existing) {
    throw new AppError("SKU_ALREADY_EXISTS", 409);
  }

  return prisma.product.create({
    data: {
      name,
      sku: normalizedSku,
      stock,
      active: active ?? true,
    },
  });
};

/**
 * LIST PRODUCTS (PAGINATED)
 */
export const listProducts = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const where = { active: true };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),

    prisma.product.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize: limit,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * GET BY ID
 */
export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new AppError("PRODUCT_NOT_FOUND", 404);
  }

  return product;
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (id, data) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new AppError("PRODUCT_NOT_FOUND", 404);
  }

  if (data.stock !== undefined && data.stock < 0) {
    throw new AppError("STOCK_NEGATIVE", 400);
  }

  if (data.sku) {
    const normalizedSku = data.sku.toLowerCase();

    const existing = await prisma.product.findFirst({
      where: {
        sku: {
          equals: normalizedSku,
          mode: "insensitive",
        },
        NOT: { id },
      },
    });

    if (existing) {
      throw new AppError("SKU_ALREADY_EXISTS", 409);
    }

    data.sku = normalizedSku;
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};

/**
 * DELETE PRODUCT (SOFT DELETE)
 */
export const deleteProduct = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new AppError("PRODUCT_NOT_FOUND", 404);
  }

  return prisma.product.update({
    where: { id },
    data: {
      active: false,
    },
  });
};