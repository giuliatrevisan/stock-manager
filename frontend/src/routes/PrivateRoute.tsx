import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth/getUserFromToken";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}