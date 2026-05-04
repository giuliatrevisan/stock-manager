import { prisma } from "../lib/prisma.js";

export const getDashboardData = async () => {
  // =========================
  // PRODUCTS
  // =========================
  const products = await prisma.product.findMany({
    select: { stock: true },
  });

  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;
  const ok = products.filter((p) => p.stock >= 10).length;

  // =========================
  // USERS
  // =========================
  const users = await prisma.user.findMany({
    select: { role: true },
  });

  const admin = users.filter((u) => u.role === "admin").length;
  const user = users.filter((u) => u.role === "user").length;

  return {
    products: {
      total: products.length,
      outOfStock,
      lowStock,
      ok,
    },
    users: {
      total: users.length,
      admin,
      user,
    },
  };
};