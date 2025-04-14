import { PrismaClient } from "@prisma/client";
import prismaErrorHandler from "../errors/handlePrismaErrors.js";

const prisma = new PrismaClient();

export const createUser = (data) =>
  prismaErrorHandler(() =>
    prisma.user.create({
      data,
    }),
  );

export const findUserByEmail = (email) =>
  prismaErrorHandler(() =>
    prisma.user.findUnique({
      where: {
        email,
      },
    }),
  );

export const findUserById = (id) =>
  prismaErrorHandler(() =>
    prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    }),
  );

export const updateUser = (id, data) =>
  prismaErrorHandler(() =>
    prisma.user.update({
      where: {
        id,
      },
      data,
    }),
  );
