import * as authService from "../services/authService.js";
import { validateUser } from "../validators/userValidator.js";

export const loginUser = async (req, res) => {
  const validUser = validateUser(req.body, "login");

  const user = await authService.loginUser(validUser);

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return { message: "Utilisateur connecté avec succès", user };
};
