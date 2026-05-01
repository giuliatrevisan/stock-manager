import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/appError.js";

/**
 * LIST USERS
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
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  return user;
};