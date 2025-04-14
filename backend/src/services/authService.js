import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import * as userRepository from "../repositories/userRepository.js";
import { calculateCaloriesNeeded } from "../utils/caloriesUtils.js";
import { signAccessToken, signRefreshToken } from "../utils/jwtUtils.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const createUser = async (data) => {
  const calories = calculateCaloriesNeeded(
    data.weight,
    data.body_fat_percentage,
    data.activity_level,
  );

  const userData = {
    ...data,
    password: await hashPassword(data.password),
    daily_calories: calories.calories,
    daily_proteins: calories.proteins.grams,
    daily_carbs: calories.carbohydrates.grams,
    daily_fats: calories.fats.grams,
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

  const payload = { id: user.id, first_name: user.first_name, email: user.email };

  const refreshToken = signRefreshToken(payload);
  const accessToken = signAccessToken(payload);

  const { id, first_name, email } = user;

  return { id, first_name, email, refreshToken, accessToken };
};
