import { api } from "../../api/axios";
import type { User } from "../../types/user";

type UserForm = {
  email: string;
  password?: string;
  role: "admin" | "user";

  name?: string;
  phone?: string;
  position?: string;
  department?: string;
};

// =========================
// LIST USERS (PAGINADO)
// =========================
export const getUsers = (page: number, pageSize: number, role?: string) => {
  return api.get<{
    items: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>("/users", {
    params: {
      page,
      pageSize,
      ...(role && role !== "all" ? { role } : {}),
    },
  });
};

// =========================
// DELETE USER (FALTAVA ISSO)
// =========================
export const deleteUser = (id: string) => {
  return api.delete(`/users/${id}`);
};

// =========================
// UPDATE USER
// =========================
export const updateUser = (id: string, data: Partial<UserForm>) => {
  return api.put<User>(`/users/${id}`, data);
};
// =========================
// CREATE USER
// =========================
export const createUser = (data: UserForm) => {
  return api.post("/auth/register-admin", {
    email: data.email,
    password: data.password,
    name: data.name,
    phone: data.phone,
    position: data.position,
    department: data.department,
    role: data.role,
  });
};

// =========================
// GET USER BY ID
// =========================
export const getUserById = (id: string) => {
  return api.get<User>(`/users/${id}`);
};
