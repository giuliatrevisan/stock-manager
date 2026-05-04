import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError.js";

/**
 * BASE: cria usuário genérico
 */
const createUser = async ({
  email,
  password,
  role,
  name,
  phone,
  position,
  department,
}) => {
  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new AppError("EMAIL_ALREADY_EXISTS", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      role,
      name: name ?? null,
      phone: phone ?? null,
      position: position ?? null,
      department: department ?? null,
    },
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    phone: user.phone,
    position: user.position,
    department: user.department,
    createdAt: user.createdAt,
  };
};

/**
 * REGISTER USER (público)
 */
export const register = (data) =>
  createUser({ ...data, role: "user" });

/**
 * REGISTER ADMIN (protegido)
 */
export const registerAdmin = (data) =>
  createUser({ ...data, role: "admin" });

/**
 * LOGIN USER
 */
export const login = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new AppError("INVALID_EMAIL", 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("INVALID_PASSWORD", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};