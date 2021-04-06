/*
  Warnings:

  - Added the required column `JSContent` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReactContent` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "JSContent" JSONB NOT NULL,
ADD COLUMN     "ReactContent" JSONB NOT NULL;
