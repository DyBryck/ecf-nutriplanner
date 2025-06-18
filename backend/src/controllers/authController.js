import * as authService from "../services/authService.js";
import * as userService from "../services/userService.js";
import { verifyToken } from "../utils/jwtUtils.js";
import { validateUser } from "../validators/userValidator.js";

export const registerUser = async (req) => {
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

export const getLoggedUser = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header est manquant ou invalide");
  }

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);

  const user = await userService.getUserById(userData.id);
  const { password, created_at, ...safeUser } = user;

  return {
    message: "Informations de l'utilisateur connecté trouvées",
    user: safeUser,
  };
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");

  return { message: "Déconnexion réussie" };
};

export const deleteLoggedUser = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header est manquant ou invalide");
  }

  const token = authHeader.split(" ")[1];
  const userData = verifyToken(token);

  const user = await userService.deleteUserById(userData.id);

  return {
    message: "Utilisateur supprimé",
    id: user.id,
  };
};
