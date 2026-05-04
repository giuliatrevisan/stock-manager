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
      name: true,
      phone: true,
      avatarUrl: true,
      position: true,
      department: true,
      isActive: true,
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
export const getUserById = async (id, currentUser) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      phone: true,
      avatarUrl: true,
      position: true,
      department: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  const isAdmin = currentUser?.role === "admin";
  const isSelf = currentUser?.id === id;

  if (!isAdmin && !isSelf) {
    throw new AppError("FORBIDDEN", 403);
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

  const allowedFields = {
    name: data.name,
    phone: data.phone,
    avatarUrl: data.avatarUrl,
    position: data.position,
    department: data.department,
  };

  // 🔥 role só admin pode alterar
  if (isAdmin && data.role) {
    allowedFields.role = data.role;
  }

  // 🔐 segurança extra: remove undefined (evita sobrescrever com null)
  Object.keys(allowedFields).forEach(
    (key) => allowedFields[key] === undefined && delete allowedFields[key]
  );

  return prisma.user.update({
    where: { id },
    data: allowedFields,
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