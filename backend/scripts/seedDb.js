import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: "John",
      email: "john@example.com",
      password: "password123",
      weight: 75.0,
      bodyFat: 15.0,
      activityLevel: 3,
    },
  });
  console.log("Utilisateur créé:", user);

  const foodsData = [
    {
      name: "Pomme",
      category: "fruit",
      calories: 52,
      proteins: 0.3,
      carbohydrates: 14,
      lipids: 0.2,
    },
    {
      name: "Poulet",
      category: "viande",
      calories: 165,
      proteins: 31,
      carbohydrates: 0,
      lipids: 3.6,
    },
    {
      name: "Riz",
      category: "legume",
      calories: 34,
      proteins: 2.8,
      carbohydrates: 6.6,
      lipids: 0.4,
    },
  ];

  const createdFoods = [];
  for (const foodData of foodsData) {
    const food = await prisma.food.create({ data: foodData });
    createdFoods.push(food);
  }
  console.log("Aliments créés:", createdFoods);

  const meal = await prisma.meal.create({
    data: {
      name: "Poulet brocolis",
      totalCalories: 300,
      totalProteins: 20,
      totalCarbohydrates: 40,
      totalLipids: 10,
    },
  });
  console.log("Repas créé:", meal);

  const mealFoodsData = [
    { mealId: meal.id, foodId: createdFoods[1].id, quantity: 1 },
    { mealId: meal.id, foodId: createdFoods[2].id, quantity: 2 },
  ];
  for (const mealFood of mealFoodsData) {
    await prisma.mealFood.create({ data: mealFood });
  }

  const weekPlan = await prisma.weekPlan.create({
    data: {
      userId: user.id,
      name: "Plan de la semaine",
    },
  });
  console.log("Plan de la semaine créé:", weekPlan);

  const weekPlanMeal = await prisma.weekPlanMeal.create({
    data: {
      weekPlanId: weekPlan.id,
      mealId: meal.id,
      day: 1,
      moment: "petit_dejeuner",
    },
  });
  console.log("Association du repas dans le plan (weekPlanMeal) créée:", weekPlanMeal);

  const groceryList = await prisma.groceryList.create({
    data: {
      userId: user.id,
      weekPlanId: weekPlan.id,
    },
  });
  console.log("Liste de courses créée:", groceryList);

  const groceryListFoodsData = [
    { groceryListId: groceryList.id, foodId: createdFoods[2].id, quantity: 3 },
  ];
  for (const glFood of groceryListFoodsData) {
    await prisma.groceryListFood.create({ data: glFood });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
