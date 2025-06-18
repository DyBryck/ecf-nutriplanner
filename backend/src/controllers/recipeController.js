import * as recipeService from "../services/recipeService.js";

export const getAllRecipes = async () => {
  const recipes = await recipeService.getAllRecipes();

  return { message: "Liste des recettes trouvée", recipes };
};

export const getRecipeById = async (req) => {
  const { id } = req.params;

  const recipe = await recipeService.getRecipeById(parseInt(id));

  return recipe;
};

export const getRandomRecipe = async () => {
  const recipe = await recipeService.getRandomRecipe();

  return recipe;
};
