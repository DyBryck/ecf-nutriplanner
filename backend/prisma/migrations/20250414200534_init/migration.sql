-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "body_fat_percentage" REAL NOT NULL,
    "activity_level" INTEGER NOT NULL,
    "daily_calories" INTEGER NOT NULL,
    "daily_proteins" REAL NOT NULL,
    "daily_carbs" REAL NOT NULL,
    "daily_fats" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbs" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "minimum_quantity" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RecipeFood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipe_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    CONSTRAINT "RecipeFood_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RecipeFood_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipe_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Meal_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealFood" (
    "meal_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("meal_id", "food_id"),
    CONSTRAINT "MealFood_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MealFood_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeekPlanMeal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "week_plan_id" INTEGER NOT NULL,
    "meal_id" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "moment" TEXT NOT NULL,
    CONSTRAINT "WeekPlanMeal_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "WeekPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WeekPlanMeal_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeekPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Plan de la semaine',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeekPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroceryList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "week_plan_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GroceryList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroceryList_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "WeekPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroceryListFood" (
    "grocery_list_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("grocery_list_id", "food_id"),
    CONSTRAINT "GroceryListFood_grocery_list_id_fkey" FOREIGN KEY ("grocery_list_id") REFERENCES "GroceryList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroceryListFood_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeekPlanMeal_week_plan_id_day_moment_key" ON "WeekPlanMeal"("week_plan_id", "day", "moment");
