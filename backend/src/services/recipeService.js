import * as recipeRepository from "../repositories/recipeRepository.js";

export const getAllRecipes = async () => {
  const recipes = await recipeRepository.getAllRecipes();

  return recipes;
};
