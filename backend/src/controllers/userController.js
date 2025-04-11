import * as userService from "../services/userService.js";
import { validateUser } from "../validators/userValidator.js";

export const getUserById = async (req) => {
  const user = await userService.getUserById(parseInt(req.params.id));
  return { message: "Utilisateur récupéré avec succès", user };
};

export const createUser = async (req) => {
  const validUser = validateUser(req.body, "post");

  const user = await userService.createUser(validUser);

  return { message: "Utilisateur crée avec succès", user };
};

export const updateUser = async (req) => {
  const user = await userService.updateUser(parseInt(req.params.id), req.body);
  return { message: "Utilisateur mis à jour avec succès", user };
};
