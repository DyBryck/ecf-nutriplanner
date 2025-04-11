import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createWeekPlan = (data) => prismaErrorHandler(() => prisma.week_plan.create({ data }));

export const createWeekPlanMeal = (data) =>
  prismaErrorHandler(() => prisma.week_plan_meal.create({ data }));

export const getWeekPlanById = (id) =>
  prismaErrorHandler(() => prisma.week_plan.findUnique({ where: { id } }));

export const getMealFoodsByWeekPlanId = async (weekPlanId) => {
  // Requête sur le week_plan avec ses week_plan_meal, incluant les meals et les meal_food
  const weekPlan = await prismaErrorHandler(() =>
    prisma.week_plan.findUnique({
      where: { id: weekPlanId },
      include: {
        week_plan_meal: {
          orderBy: { day: "asc" },
          // Les enregistrements week_plan_meal contiennent déjà day et moment
          include: {
            meal: {
              select: {
                meal_food: {
                  select: {
                    meal_id: true,
                    food_id: true,
                    quantity: true,
                    // Sélectionner également le nom de l'ingrédient dans food
                    food: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
  );

  if (!weekPlan) {
    throw new Error(`Week plan avec l'id ${weekPlanId} introuvable.`);
  }

  // Extraction d'un tableau plat des meal_food en y ajoutant day et moment
  const mealFoods = weekPlan.week_plan_meal.flatMap((wpm) =>
    wpm.meal.meal_food.map((mf) => ({
      meal_id: mf.meal_id,
      food_id: mf.food_id,
      quantity: mf.quantity,
      ingredientName: mf.food.name, // Ajout du nom de l'ingrédient
      day: wpm.day, // Jour du repas (provenant de week_plan_meal)
      moment: wpm.moment, // Moment du repas (provenant de week_plan_meal)
    })),
  );

  return mealFoods;
};
