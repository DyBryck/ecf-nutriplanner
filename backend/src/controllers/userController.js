import * as userService from "../services/userService.js";
import { validateUser } from "../validators/userValidator.js";

export const createUser = async (req) => {
  console.log(req.body);
  const validUser = validateUser(req.body, "post");

  const user = await userService.createUser(validUser);

  return { message: "Utilisateur crée avec succès", user };
};

export const loginUser = async (req) => {
  const validUser = validateUser(req.body, "login");

  const user = await userService.loginUser(validUser);

  return { message: "Utilisateur connecté avec succès", user };
};
