import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const getAllRecipes = () =>
  prismaErrorHandler(() =>
    prisma.recipe.findMany({
      include: { recipe_foods: { include: { food: true } } },
    }),
  );

export const getRecipeById = (id) =>
  prismaErrorHandler(() =>
    prisma.recipe.findUniqueOrThrow({
      where: { id },
    }),
  );

export const getTotalRecipes = () => prismaErrorHandler(() => prisma.recipe.count());
