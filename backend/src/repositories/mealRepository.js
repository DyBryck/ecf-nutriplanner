import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createMeal = (data) =>
  prismaErrorHandler(() => prisma.meal.create({ data: { recipe_id: data.id, name: data.name } }));

export const createMealFood = (mealId, foodId, quantity) =>
  prismaErrorHandler(() =>
    prisma.mealFood.create({
      data: {
        food_id: foodId,
        meal_id: mealId,
        quantity: quantity,
      },
    }),
  );

export const createGroceryList = (userId, weekPlanId) =>
  prismaErrorHandler(() =>
    prisma.groceryList.create({
      data: {
        user_id: userId,
        week_plan_id: weekPlanId,
      },
    }),
  );
