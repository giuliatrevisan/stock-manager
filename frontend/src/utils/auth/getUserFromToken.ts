import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

type DecodedToken = {
  userId: string;
  role: "admin" | "user";
  exp: number;
  email: string;
};

const TOKEN_KEY = "auth_token";

export function getUserFromToken(tokenParam?: string) {
  const token = tokenParam || Cookies.get(TOKEN_KEY);

  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      Cookies.remove(TOKEN_KEY);
      return null;
    }

    return decoded;
  } catch {
    Cookies.remove(TOKEN_KEY);
    return null;
  }
}