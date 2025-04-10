import { NotFoundError } from "../errors/customErrors.js";
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

export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  return user;
};

export const updateUser = async (id, data) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  const updatedUser = await userRepository.updateUser(id, data);
  if (!updatedUser) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }

  return updatedUser;
};
