import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createWeekPlan = (data) => prismaErrorHandler(() => prisma.week_plan.create({ data }));

export const createWeekPlanMeal = (data) =>
  prismaErrorHandler(() => prisma.week_plan_meal.create({ data }));
