// src/utils/auth/tokenStorage.ts
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

export const tokenStorage = {
  set(token: string) {
    Cookies.set(TOKEN_KEY, token, {
      expires: 1, // 1 dia
      sameSite: "strict",
    });
  },

  get() {
    return Cookies.get(TOKEN_KEY);
  },

  remove() {
    Cookies.remove(TOKEN_KEY);
  },
};