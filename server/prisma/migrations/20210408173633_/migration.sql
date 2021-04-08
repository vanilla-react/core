/*
  Warnings:

  - You are about to drop the column `snippetId` on the `Feedback` table. All the data in the column will be lost.
  - The primary key for the `Kudo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `snippetId` on the `Kudo` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `JSContent` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `ReactContent` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Kudo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programmingLanguageId` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PENDING', 'APPROVED');

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "Kudo" DROP CONSTRAINT "Kudo_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- DropIndex
DROP INDEX "Snippet.slug_index";

-- DropIndex
DROP INDEX "Snippet.slug_unique";

-- DropIndex
DROP INDEX "Snippet.title_userId_unique";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "snippetId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kudo" DROP CONSTRAINT "Kudo_pkey",
DROP COLUMN "snippetId",
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD PRIMARY KEY ("userId", "postId");

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "slug",
DROP COLUMN "title",
DROP COLUMN "status",
DROP COLUMN "userId",
DROP COLUMN "JSContent",
DROP COLUMN "ReactContent",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "programmingLanguageId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "SnippetStatus";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT E'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgrammingLanguage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post.slug_unique" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post.title_userId_unique" ON "Post"("title", "userId");

-- CreateIndex
CREATE INDEX "Post.slug_index" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammingLanguage.name_unique" ON "ProgrammingLanguage"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kudo" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD FOREIGN KEY ("programmingLanguageId") REFERENCES "ProgrammingLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
