import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const getAllRecipes = () =>
  prismaErrorHandler(() =>
    prisma.recipe.findMany({
      include: {
        recipe_food: {
          include: {
            food: true,
          },
        },
      },
    }),
  );
