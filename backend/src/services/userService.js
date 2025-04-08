import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import * as userRepository from "../repositories/userRepository.js";
import { signAccessToken, signRefreshToken } from "../utils/jwtUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

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

export const loginUser = async (data) => {
  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Mot de passe incorrect");
  }

  // générer un token JWT ici si nécessaire
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return { user, accessToken, refreshToken };
};
