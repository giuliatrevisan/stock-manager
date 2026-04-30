import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    // remove senha da resposta (segurança obrigatória)
    const { password, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    // regra: email duplicado
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Email já está em uso",
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};