/*
  Warnings:

  - Added the required column `type` to the `Kudo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KudoType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "Kudo" ADD COLUMN     "type" "KudoType" NOT NULL;
