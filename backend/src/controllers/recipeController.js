import * as recipeService from "../services/recipeService.js";

export const getAllRecipes = async () => {
  const recipes = await recipeService.getAllRecipes();

  return { message: "Liste des recettes trouvée", recipes };
};
