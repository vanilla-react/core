/*
  Warnings:

  - A unique constraint covering the columns `[template]` on the table `ProgrammingLanguage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `template` to the `ProgrammingLanguage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post.slug_unique";

-- AlterTable
ALTER TABLE "ProgrammingLanguage" ADD COLUMN     "template" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammingLanguage.template_unique" ON "ProgrammingLanguage"("template");
