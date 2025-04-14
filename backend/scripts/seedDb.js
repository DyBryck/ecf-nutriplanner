import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedDb = async () => {
  const aliments = [
    {
      name: "Riz Basmati",
      calories: 130,
      proteins: 0.086,
      carbs: 0.77,
      fats: 0.009,
      minimum_quantity: 60,
    },
    {
      name: "Poulet",
      calories: 165,
      proteins: 0.22,
      carbs: 0,
      fats: 0.021,
      minimum_quantity: 150,
    },
    {
      name: "Bœuf",
      calories: 250,
      proteins: 0.216,
      carbs: 0.002,
      fats: 0.05,
      minimum_quantity: 150,
    },
  ];

  const recipes = [
    {
      name: "Riz poulet",
    },
    {
      name: "Riz bœuf",
    },
  ];

  const recipes_foods = [
    {
      recipe_id: 1,
      food_id: 1,
    },
    {
      recipe_id: 1,
      food_id: 2,
    },
    {
      recipe_id: 2,
      food_id: 1,
    },
    {
      recipe_id: 2,
      food_id: 3,
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

    await prisma.recipeFood.createMany({
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
