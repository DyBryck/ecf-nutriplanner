import express from "express";
import * as authController from "../controllers/authController.js";
import * as foodController from "../controllers/foodController.js";
import * as mealController from "../controllers/mealController.js";
import * as recipeController from "../controllers/recipeController.js";
import * as userController from "../controllers/userController.js";
import * as weekPlanController from "../controllers/weekPlanController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express.Router();

router.post("/auth/register", handleRequest(authController.registerUser));
router.post("/auth/login", handleRequest(authController.loginUser));
router.post("/auth/logout", handleRequest(authController.logout));
router.get("/auth/me", handleRequest(authController.getLoggedUser));
router.delete("/auth/me", handleRequest(authController.deleteLoggedUser));

router.put("/users/:id", handleRequest(userController.updateUser));
router.get("/users/:id", handleRequest(userController.getUserById));

router.get("/foods", handleRequest(foodController.getAllFoods));

router.get("/recipes/random", handleRequest(recipeController.getRandomRecipe));
router.get("/recipes", handleRequest(recipeController.getAllRecipes));
router.get("/recipes/:id", handleRequest(recipeController.getRecipeById));

router.post("/week-plan", handleRequest(weekPlanController.createWeekPlan));
router.get("/weekplan/:id", handleRequest(weekPlanController.getWeekPlanById));
router.get("/get-weekly-plan", handleRequest(weekPlanController.generateWeeklyPlan));

router.post("/meals", handleRequest(mealController.createMeal));
router.post("/meals/food", handleRequest(mealController.createMealFood));
router.get("/generate-grocery-list", handleRequest(mealController.createGroceryList));

export default router;
