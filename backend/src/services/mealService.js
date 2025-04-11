import * as mealRepository from "../repositories/mealRepository.js";
import * as weekPlanRepository from "../repositories/weekPlanRepository.js";

export const createMeal = async (id) => {
  const meal = await mealRepository.createMeal(id);

  return meal;
};

export const createMealFood = async (mealId, foodId, quantity) => {
  const mealFood = await mealRepository.createMealFood(mealId, foodId, quantity);

  return mealFood;
};

export const createGroceryList = async (userId, weekPlanId) => {
  const groceryList = await mealRepository.createGroceryList(userId, weekPlanId);

  const mealList = await weekPlanRepository.getMealFoodsByWeekPlanId(weekPlanId);

  return { groceryList, mealList };
};
