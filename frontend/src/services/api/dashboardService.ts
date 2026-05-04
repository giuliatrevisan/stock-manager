import { api } from "../../api/axios";

type DashboardResponse = {
  products: {
    total: number;
    outOfStock: number;
    lowStock: number;
    ok: number;
  };
  users: {
    total: number;
    admin: number;
    user: number;
  };
};

export const getDashboard = () => {
  return api.get<DashboardResponse>("/dashboard");
};