/*
  Warnings:

  - A unique constraint covering the columns `[slug,userId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post.slug_index";

-- DropIndex
DROP INDEX "Post.title_userId_unique";

-- CreateIndex
CREATE UNIQUE INDEX "Post.slug_userId_unique" ON "Post"("slug", "userId");
