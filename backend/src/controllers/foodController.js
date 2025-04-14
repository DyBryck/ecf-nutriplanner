import * as foodService from "../services/foodService.js";

export const getAllFoods = async () => {
  const foods = await foodService.getAllFoods();

  return { message: "Liste des ingrédients trouvée", foods };
};
