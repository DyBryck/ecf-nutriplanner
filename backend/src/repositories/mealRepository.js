import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createMeal = (id) =>
  prismaErrorHandler(() => prisma.meal.create({ data: { recipe_id: id } }));

export const createMealFood = (mealId, foodId, quantity) =>
  prismaErrorHandler(() =>
    prisma.meal_food.create({
      data: {
        food_id: foodId,
        meal_id: mealId,
        quantity: quantity,
      },
    }),
  );
