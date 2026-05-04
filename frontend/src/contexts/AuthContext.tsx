import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../api/axios";
import { getUserFromToken } from "../utils/auth/getUserFromToken";

type User = {
  userId: string;
  email: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // INIT (mantém login após refresh)
  useEffect(() => {
    const decoded = getUserFromToken();
    setUser(decoded);
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

      Cookies.set(TOKEN_KEY, token, {
        expires: 1, // 1 dia
        secure: true,
        sameSite: "strict",
      });

      const decoded = getUserFromToken(token);
      setUser(decoded);

      return true;
    } catch (err) {
      return false;
    }
  }

  // LOGOUT
  function logout() {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);