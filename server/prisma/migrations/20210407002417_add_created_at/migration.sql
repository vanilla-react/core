/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Snippet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Kudo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JSContent` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReactContent` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Kudo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "JSContent" JSONB NOT NULL,
ADD COLUMN     "ReactContent" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Snippet.slug_unique" ON "Snippet"("slug");

-- CreateIndex
CREATE INDEX "Snippet.slug_index" ON "Snippet"("slug");
