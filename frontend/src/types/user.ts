export type User = {
  id: string;
  email: string;
  role: "admin" | "user";

  name: string | null;
  phone: string | null;
  avatarUrl?: string | null;
  position: string | null;
  department: string | null;

  isActive?: boolean;
  createdAt: string;
};