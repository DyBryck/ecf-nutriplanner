import * as mealService from "../services/mealService.js";

export const createMeal = async (req) => {
  const recipeId = parseInt(req.query.recipe_id);
  const meal = await mealService.createMeal(recipeId);

  return { message: "Repas crée", meal };
};

export const createMealFood = async (req) => {
  const { meal_id, food_id, quantity } = req.body;

  const mealFood = await mealService.createMealFood(meal_id, food_id, quantity);

  return { message: "Nourriture ajoutée au repas", mealFood };
};

export const createGroceryList = async (req) => {
  const { user_id, week_plan_id } = req.query;

  const groceryList = await mealService.createGroceryList(
    parseInt(user_id),
    parseInt(week_plan_id),
  );

  return { message: "Liste de courses générée", groceryList };
};
