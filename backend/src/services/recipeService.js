import * as recipeRepository from "../repositories/recipeRepository.js";
import { getRandomInt } from "../utils/commonUtils.js";

export const getAllRecipes = async () => {
  const recipes = await recipeRepository.getAllRecipes();

  return recipes;
};

export const getRecipeById = async (id) => {
  const recipe = await recipeRepository.getRecipeById(id);

  return recipe;
};

export const getRandomRecipe = async () => {
  const totalRecipes = await recipeRepository.getTotalRecipes();

  const randomId = getRandomInt(totalRecipes);

  const randomRecipe = recipeRepository.getRecipeById(randomId);

  return randomRecipe;
};
