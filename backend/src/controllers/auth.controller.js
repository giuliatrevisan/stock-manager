import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  const user = await authService.register(req.body);
  return res.status(201).json(user);
};

export const login = async (req, res) => {
  const data = await authService.login(req.body);
  return res.status(200).json(data);
};

export const registerAdmin = async (req, res) => {
  const user = await authService.registerAdmin(req.body);
  return res.status(201).json(user);
};