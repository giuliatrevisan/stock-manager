import { prisma } from "../lib/prisma.js";

/**
 * LIST USERS (com filtro por role opcional)
 */
export const listUsers = async ({ role } = {}) => {
  return prisma.user.findMany({
    where: role ? { role } : {},
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

/**
 * GET USER BY ID
 */
export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};