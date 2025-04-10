import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedDb = async () => {
  const aliments = [
    {
      name: "Pomme",
      category: "fruit",
      calories: 52,
      proteins: 0.3,
      carbohydrates: 14,
      lipids: 0.2,
    },
    {
      name: "Riz",
      category: "cereale",
      calories: 130,
      proteins: 2.7,
      carbohydrates: 28,
      lipids: 0.3,
    },
    {
      name: "Brocolis",
      category: "legume",
      calories: 34,
      proteins: 2.8,
      carbohydrates: 6.6,
      lipids: 0.4,
    },
    {
      name: "Poulet",
      category: "viande_blanche",
      calories: 165,
      proteins: 31,
      carbohydrates: 0,
      lipids: 3.6,
    },
    {
      name: "Tomates",
      category: "fruit",
      calories: 18,
      proteins: 0.9,
      carbohydrates: 3.9,
      lipids: 0.2,
    },
    {
      name: "Boeuf",
      category: "viande_rouge",
      calories: 250,
      proteins: 26,
      carbohydrates: 0,
      lipids: 15,
    },
    {
      name: "Flocons d'avoine",
      category: "cereale",
      calories: 389,
      proteins: 16.9,
      carbohydrates: 66,
      lipids: 6.9,
    },
    {
      name: "Kiwi",
      category: "fruit",
      calories: 61,
      proteins: 1.1,
      carbohydrates: 14.7,
      lipids: 0.5,
    },
    {
      name: "Banane",
      category: "fruit",
      calories: 89,
      proteins: 1.1,
      carbohydrates: 22.8,
      lipids: 0.3,
    },
  ];

  const recipes = [
    {
      name: "Riz poulet",
    },
  ];

  const recipes_foods = [
    {
      recipe_id: 1,
      food_id: 2,
    },
    {
      recipe_id: 1,
      food_id: 4,
    },
  ];

  try {
    await prisma.food.createMany({
      data: aliments,
    });
    console.log("Les aliments ont été insérés avec succès dans la base de données.");

    await prisma.recipe.createMany({
      data: recipes,
    });
    console.log("Les recettes ont été insérées avec succès dans la base de données.");

    await prisma.recipe_food.createMany({
      data: recipes_foods,
    });
    console.log(
      "Les ingrédients des recettes ont été insérées avec succès dans la base de données.",
    );
  } catch (error) {
    console.error("Une erreur est survenue lors de l'insertion :", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDb();
