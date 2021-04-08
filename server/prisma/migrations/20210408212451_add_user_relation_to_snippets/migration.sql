/*
  Warnings:

  - Added the required column `userId` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Snippet" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
