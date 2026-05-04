import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth/getUserFromToken";
import React from "react";

type Props = {
  children: React.ReactElement;
};

export function AdminRoute({ children }: Props) {
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    return <Navigate to="/estoque" replace />;
  }

  return children;
}