import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import * as userRepository from "../repositories/userRepository.js";
import { signRefreshToken } from "../utils/jwtUtils.js";
import { comparePassword } from "../utils/passwordUtils.js";

export const loginUser = async (data) => {
  const user = await userRepository.findUserByEmail(data.email);
  console.log(data.email);
  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Mot de passe incorrect");
  }

  const refreshToken = signRefreshToken(user);

  return { user, refreshToken };
};
