import * as userService from "../services/userService.js";

export const getUserById = async (req) => {
  const user = await userService.getUserById(parseInt(req.params.id));
  return { message: "Utilisateur récupéré avec succès", user };
};

export const updateUser = async (req) => {
  const user = await userService.updateUser(parseInt(req.params.id), req.body);
  return { message: "Utilisateur mis à jour avec succès", user };
};
