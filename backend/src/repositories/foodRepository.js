import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const getAllFoods = () => prismaErrorHandler(() => prisma.food.findMany());
