/*
  Warnings:

  - Added the required column `minimum_quantity` to the `food` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbohydrates" REAL NOT NULL,
    "lipids" REAL NOT NULL,
    "minimum_quantity" REAL NOT NULL
);
INSERT INTO "new_food" ("calories", "carbohydrates", "category", "id", "lipids", "name", "proteins") SELECT "calories", "carbohydrates", "category", "id", "lipids", "name", "proteins" FROM "food";
DROP TABLE "food";
ALTER TABLE "new_food" RENAME TO "food";
CREATE UNIQUE INDEX "food_name_key" ON "food"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
