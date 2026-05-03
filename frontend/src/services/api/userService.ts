import { api } from "../../api/axios";
import type { User } from "../../types/user";

type UserForm = {
  email: string;
  password?: string;
  role: "admin" | "user";
};

type UsersResponse = {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// =========================
// LIST USERS (PAGINADO)
// =========================
export const getUsers = (
  page: number,
  pageSize: number,
  role?: string
) => {
  return api.get<UsersResponse>("/users", {
    params: {
      page,
      pageSize,
      ...(role && role !== "all" && { role }),
    },
  });
};

// =========================
// DELETE USER
// =========================
export const deleteUser = (id: string) => {
  return api.delete<void>(`/users/${id}`);
};

// =========================
// UPDATE USER
// =========================
export const updateUser = (
  id: string,
  data: Partial<Pick<UserForm, "email" | "role">>
) => {
  return api.put<User>(`/users/${id}`, data);
};

// =========================
// CREATE USER
// =========================
export const createUser = (data: UserForm) => {
  return api.post<User>("/auth/register", {
    email: data.email,
    password: data.password,
  });
};