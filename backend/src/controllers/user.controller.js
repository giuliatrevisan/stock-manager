import * as userService from "../services/user.service.js";

/**
 * LIST USERS
 */
export const listUsers = async (req, res) => {
  const { role, page = 1, pageSize = 10 } = req.query;

  const users = await userService.listUsers({
    role,
    page: Number(page),
    pageSize: Number(pageSize),
  });

  return res.json(users);
};

/**
 * GET USER BY ID
 */
export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  return res.json(user);
};

/**
 * DELETE
 */
export const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id, req.user);
  return res.status(204).send();
};
/**
 * UPDATE
 */
export const updateUser = async (req, res) => {
  const updated = await userService.updateUser(
    req.params.id,
    req.body,
    req.user
  );

  return res.json(updated);
};
