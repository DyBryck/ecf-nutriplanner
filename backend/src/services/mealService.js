import * as mealRepository from "../repositories/mealRepository.js";

export const createMeal = async (id) => {
  const meal = await mealRepository.createMeal(id);

  return meal;
};

export const createMealFood = async (mealId, foodId, quantity) => {
  const mealFood = await mealRepository.createMealFood(mealId, foodId, quantity);

  return mealFood;
};
