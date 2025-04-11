import * as foodRepository from "../repositories/foodRepository.js";

export const getAllFoods = async () => {
  const recipes = await foodRepository.getAllFoods();

  return recipes;
};
