<<<<<<< HEAD
export const getAllUsers = async () => {
  return { message: "ok" };
=======
import * as userService from "../services/userService.js";
import { validateUser } from "../validators/userValidator.js";

export const createUser = async (req) => {
  const validUser = validateUser(req.body, "post");

  const user = await userService.createUser(validUser);

  return { message: "Utilisateur crée avec succès", user };
>>>>>>> 099f4a1 (feat(register route): controller, service, repository, tests, validators)
};
