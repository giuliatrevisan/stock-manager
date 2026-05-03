import { prisma } from "../lib/prisma.js";
import { AppError } from "../errors/appError.js";

/**
 * LIST USERS
 */
export const listUsers = async ({ role, page = 1, pageSize = 10 } = {}) => {
  const where = {
    ...(role && { role }),
  };

  const total = await prisma.user.count({ where });

  const items = await prisma.user.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
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

/**
 * UPDATE USER
 */
export const updateUser = async (id, data, currentUser) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  const isAdmin = currentUser?.role === "admin";
  const isSelf = currentUser?.id === id;

  if (!isAdmin && !isSelf) {
    throw new AppError("FORBIDDEN", 403);
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};
/**
 * DELETE USER
 */
export const deleteUser = async (id, currentUser) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  if (currentUser && user.id === currentUser.id) {
    throw new AppError("CANNOT_DELETE_SELF", 400);
  }

  return prisma.user.delete({
    where: { id },
  });

};