import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "NAME_REQUIRED"),
  sku: z.string().min(1, "SKU_REQUIRED"),
  stock: z.number().int().min(0, "STOCK_MIN_0"),
  active: z.boolean().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
});