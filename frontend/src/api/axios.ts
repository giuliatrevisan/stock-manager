import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "../utils/auth/auth";

const TOKEN_KEY = "auth_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isLoggingOut = false;

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      logout("Sessão expirada. Faça login novamente.");
    }

    return Promise.reject(error);
  }
);