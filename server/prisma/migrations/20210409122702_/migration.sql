/*
  Warnings:

  - A unique constraint covering the columns `[programmingLanguageId,postId]` on the table `Snippet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Snippet.programmingLanguageId_postId_unique" ON "Snippet"("programmingLanguageId", "postId");
