import * as userService from "../services/user.service.js";

/**
 * LIST USERS (com filtro por role)
 * GET /users?role=admin | user
 */
export const listUsers = async (req, res) => {
  const { role } = req.query;

  const users = await userService.listUsers({ role });

  res.json(users);
};

/**
 * GET USER BY ID
 */
export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};