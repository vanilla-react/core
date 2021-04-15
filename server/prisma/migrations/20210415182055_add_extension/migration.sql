/*
  Warnings:

  - A unique constraint covering the columns `[extension]` on the table `ProgrammingLanguage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `extension` to the `ProgrammingLanguage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProgrammingLanguage.template_unique";

-- AlterTable
ALTER TABLE "ProgrammingLanguage" ADD COLUMN     "extension" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammingLanguage.extension_unique" ON "ProgrammingLanguage"("extension");
