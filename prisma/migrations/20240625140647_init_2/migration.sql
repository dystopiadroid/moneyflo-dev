/*
  Warnings:

  - You are about to drop the column `description` on the `Expense` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,date,title]` on the table `Expense` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Expense_user_id_date_description_key";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "description",
ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Expense_user_id_date_title_key" ON "Expense"("user_id", "date", "title");
