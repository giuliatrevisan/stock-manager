import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/AuthPage";
import InventoryPage from "../pages/inventory/inventoryPage";
import UsersPage from "../pages/users/usersPage";

import Layout from "../components/layout/Layout";
import type { ReactNode } from "react";
import { AdminRoute } from "./ProtectedRoute";
import DashboardPage from "../pages/dashboard/DashboardPage";
import FaqPage from "../pages/faq/FaqsPage";
import ProfilePage from "../pages/profile/ProfilePage";

import { getUserFromToken } from "../utils/auth/getUserFromToken";

function PrivateRoute({ children }: { children: ReactNode }) {
  const user = getUserFromToken();

  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* LAYOUT PROTEGIDO */}
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

        {/* DASHBOARD */}
        <Route path="/graficos" element={<DashboardPage />} />

        {/* FAQ */}
        <Route path="/faqs" element={<FaqPage />} />

        {/* PERFIL */}
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}