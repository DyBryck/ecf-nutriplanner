import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import * as userRepository from "../repositories/userRepository.js";
import { signAccessToken, signRefreshToken } from "../utils/jwtUtils.js";
import { comparePassword } from "../utils/passwordUtils.js";

export const loginUser = async (data) => {
  const user = await userRepository.findUserByEmail(data.email);

  if (!user) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Mot de passe incorrect");
  }

  const payload = { id: user.id, first_name: user.first_name, email: user.email };

  const refreshToken = signRefreshToken(payload);
  const accessToken = signAccessToken(payload);

  const { id, first_name, email } = user;

  return { id, first_name, email, refreshToken, accessToken };
};
