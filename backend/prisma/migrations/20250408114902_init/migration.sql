-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "body_fat" REAL NOT NULL,
    "activity_level" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "foods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbohydrates" REAL NOT NULL,
    "lipids" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "user_rejected_foods" (
    "user_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "food_id"),
    CONSTRAINT "user_rejected_foods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_rejected_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "total_calories" REAL NOT NULL,
    "total_proteins" REAL NOT NULL,
    "total_carbohydrates" REAL NOT NULL,
    "total_lipids" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "meal_foods" (
    "meal_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("meal_id", "food_id"),
    CONSTRAINT "meal_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "meal_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "week_plan_meals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "week_plan_id" INTEGER NOT NULL,
    "meal_id" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "moment" TEXT NOT NULL,
    CONSTRAINT "week_plan_meals_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "week_plans" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "week_plan_meals_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "week_plans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Plan de la semaine',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "week_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "grocery_lists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "week_plan_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "grocery_lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "grocery_lists_week_plan_id_fkey" FOREIGN KEY ("week_plan_id") REFERENCES "week_plans" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "grocery_list_foods" (
    "grocery_list_id" INTEGER NOT NULL,
    "food_id" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    PRIMARY KEY ("grocery_list_id", "food_id"),
    CONSTRAINT "grocery_list_foods_grocery_list_id_fkey" FOREIGN KEY ("grocery_list_id") REFERENCES "grocery_lists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "grocery_list_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "foods_name_key" ON "foods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "meals_name_key" ON "meals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "week_plan_meals_week_plan_id_day_moment_key" ON "week_plan_meals"("week_plan_id", "day", "moment");
