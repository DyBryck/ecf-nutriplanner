// import * as weekPlanRepository from "../repositories/weekPlanRepository.js";
import * as weekPlanRepository from "../repositories/weekPlanRepository.js";
import * as mealService from "../services/mealService.js";
import * as recipeService from "../services/recipeService.js";
import * as userService from "../services/userService.js";
import { calculateCaloriesNeeded, optimizeRecipe } from "../utils/caloriesUtils.js";

export const createWeekPlan = async (data) => {
  const weekPlan = await weekPlanRepository.createWeekPlan(data);

  return weekPlan;
};

export const generateWeeklyPlan = async (id) => {
  const user = await userService.getUserById(id);
  const recipes = await recipeService.getAllRecipes();
  const weekPlan = await weekPlanRepository.createWeekPlan({ user_id: id });

  const caloriesNeeded = calculateCaloriesNeeded(user.weight, user.body_fat, user.activity_level);

  const macroPerMeal = {
    protein: Math.round(caloriesNeeded.proteins.grams / 4),
    carb: Math.round(caloriesNeeded.carbohydrates.grams / 4),
    lipid: Math.round(caloriesNeeded.fats.grams / 4),
  };

  const plan = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      const recipe = recipes[Math.floor(Math.random() * recipes.length)];
      const basicMeal = await mealService.createMeal(recipe.id);

      const recipeToOptimize = recipe.recipe_food.map((item) => ({
        name: item.food.name,
        p: item.food.proteins,
        c: item.food.carbohydrates,
        l: item.food.lipids,
        min: item.food.minimum_quantity,
        id: item.food.id,
      }));

      const result = optimizeRecipe(recipeToOptimize, macroPerMeal);

      const mealFood = await result.ingredients.map(async (ingredient) => {
        await mealService.createMealFood(basicMeal.id, ingredient.id, Math.round(ingredient.grams));
      });

      const meal = {
        day: i + 1,
        meal: j + 1,
        recipe: recipe.name,
        food: result.ingredients,
        id: recipe.id,
      };

      const moments = {
        1: "petit_dejeuner",
        2: "dejeuner",
        3: "collation",
        4: "diner",
      };

      plan.push(meal);

      const mealCreated = await weekPlanRepository.createWeekPlanMeal({
        week_plan_id: weekPlan.id,
        meal_id: basicMeal.id,
        day: i + 1,
        moment: moments[j + 1],
      });
    }
  }

  return plan;
};
