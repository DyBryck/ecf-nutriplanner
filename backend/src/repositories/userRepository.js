import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createUser = (data) =>
  prismaErrorHandler(() =>
    prisma.users.create({
      data,
    }),
  );
