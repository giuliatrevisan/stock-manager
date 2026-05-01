import * as userService from "../services/user.service.js";

/**
 * LIST USERS
 */
export const listUsers = async (req, res) => {
  const { role } = req.query;

  const users = await userService.listUsers({ role });

  return res.json(users);
};

/**
 * GET USER BY ID
 */
export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  return res.json(user);
};