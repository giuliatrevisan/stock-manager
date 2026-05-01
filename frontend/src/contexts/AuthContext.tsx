import { createContext, useContext, useState } from "react";
import { api } from "../api/axios";

type User = {
  email: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    // decode simples (sem lib pra manter leve)
    const payload = JSON.parse(atob(token.split(".")[1]));

    setUser({
      email: payload.email,
      role: payload.role,
    });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);