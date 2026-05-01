import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/AuthPage";
import Home from "../pages/home/home";
import type { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />

      {/* HOME (PROTEGIDA) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}