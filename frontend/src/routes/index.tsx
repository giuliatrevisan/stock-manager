import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/AuthPage";
import InventoryPage from "../pages/inventory/inventoryPage";
import UsersPage from "../pages/users/usersPage";

import Layout from "../components/layout/Layout";
import type { ReactNode } from "react";
import { AdminRoute } from "./ProtectedRoute";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* LAYOUT PROTEGIDO (todas áreas logadas) */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* REDIRECT ROOT */}
        <Route path="/" element={<Navigate to="/estoque" />} />

        {/* ESTOQUE */}
        <Route path="/estoque" element={<InventoryPage />} />

        {/* USERS (somente admin) */}
        <Route
          path="/users"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}