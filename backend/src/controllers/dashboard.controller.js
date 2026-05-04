import * as dashboardService from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  const data = await dashboardService.getDashboardData();
  return res.json(data);
};