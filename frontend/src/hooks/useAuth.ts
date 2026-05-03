import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { notify } from "../components/ui/toast";
import { getUserFromToken } from "../utils/auth/getUserFromToken";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //  init
  useEffect(() => {
    const userFromToken = getUserFromToken();
    setUser(userFromToken);
    setLoading(false);
  }, []);

  //  LOGIN
  async function login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      const decoded = getUserFromToken();
      setUser(decoded);

      notify.success("Login realizado 🚀");

      return true;
    } catch (err: any) {
      const code = err?.response?.data?.message;

      if (code === "INVALID_EMAIL") {
        throw { field: "email", message: "Verifique seu email" };
      }

      if (code === "INVALID_PASSWORD") {
        throw { field: "password", message: "Senha incorreta" };
      }

      notify.error("Erro ao fazer login");
      return false;
    }
  }

  //  REGISTER
  async function register(email: string, password: string) {
    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      notify.success("Conta criada 🎉");
      return true;
    } catch (err: any) {
      const code = err?.response?.data?.message;

      if (code === "EMAIL_ALREADY_EXISTS") {
        throw { field: "email", message: "Email já cadastrado" };
      }

      notify.error("Erro ao cadastrar");
      return false;
    }
  }

  //  LOGOUT
  function logout(message?: string) {
    localStorage.removeItem("token");

    setUser(null);

    if (message) {
      sessionStorage.setItem("logout_message", message);
    }

    window.location.href = "/login";
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}