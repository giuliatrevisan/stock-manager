import axios from "axios";
import { logout } from "../utils/auth/auth";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

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