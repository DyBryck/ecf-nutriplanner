-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "body_fat" REAL NOT NULL,
    "activity_level" INTEGER NOT NULL,
    "calories_needed" INTEGER NOT NULL,
    "proteins_needed" INTEGER NOT NULL,
    "carbohydrates_needed" INTEGER NOT NULL,
    "fats_needed" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbohydrates" REAL NOT NULL,
    "lipids" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "user_rejected_food" (
    "user_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "food_id"),
    CONSTRAINT "user_rejected_food_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_rejected_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "recipe_food" (
    "recipe_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,

    PRIMARY KEY ("recipe_id", "food_id"),
    CONSTRAINT "recipe_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "recipe_food_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipe_id" INTEGER NOT NULL,
    CONSTRAINT "meal_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meal_food" (
    "meal_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("meal_id", "food_id"),
    CONSTRAINT "meal_food_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "meal_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "week_plan_meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "week_plan_id" INTEGER NOT NULL,
    "meal_id" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "moment" TEXT NOT NULL,
    CONSTRAINT "week_plan_meal_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "week_plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "week_plan_meal_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "week_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Plan de la semaine',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "week_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "grocery_list" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "week_plan_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "grocery_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "grocery_list_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "week_plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "grocery_list_food" (
    "grocery_list_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("grocery_list_id", "food_id"),
    CONSTRAINT "grocery_list_food_grocery_list_id_fkey" FOREIGN KEY ("grocery_list_id") REFERENCES "grocery_list" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "grocery_list_food_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "food_name_key" ON "food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_name_key" ON "recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "week_plan_meal_week_plan_id_day_moment_key" ON "week_plan_meal"("week_plan_id", "day", "moment");
