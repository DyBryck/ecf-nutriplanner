import * as userRepository from "../repositories/userRepository.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const createUser = async (data) => {
  const userData = {
    ...data,
    password: await hashPassword(data.password),
  };

  const newUser = await userRepository.createUser(userData);
  if (!newUser) {
    throw new Error("Erreur lors de la création de l'utilisateur");
  }

  return newUser;
};
