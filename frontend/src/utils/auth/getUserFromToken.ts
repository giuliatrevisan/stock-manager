import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  userId: string;
  role: string;
  exp: number;
};

export function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch {
    return null;
  }
}