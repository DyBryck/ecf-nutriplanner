import * as authService from "../services/authService.js";
import { validateUser } from "../validators/userValidator.js";

export const createUser = async (req) => {
  if (!req.body) return { message: "Aucune donnée envoyée" };
  const validUser = await validateUser(req.body, "post");

  const user = await userService.createUser(validUser);

  return { message: "Utilisateur crée avec succès", user };
};

export const loginUser = async (req, res) => {
  const validUser = validateUser(req.body, "login");

  const user = await authService.loginUser(validUser);

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return {
    message: "Utilisateur connecté avec succès",
    user: { id: user.id, firstName: user.first_name, email: user.email },
    token: user.accessToken,
  };
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");

  return { message: "Déconnexion réussie" };
};
