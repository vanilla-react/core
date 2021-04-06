-- CreateEnum
CREATE TYPE "SnippetStatus" AS ENUM ('PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" "SnippetStatus" NOT NULL DEFAULT E'PENDING',
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "snippetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kudo" (
    "userId" INTEGER NOT NULL,
    "snippetId" INTEGER NOT NULL,

    PRIMARY KEY ("userId","snippetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Snippet.title_userId_unique" ON "Snippet"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback.userId_content_unique" ON "Feedback"("userId", "content");

-- AddForeignKey
ALTER TABLE "Snippet" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kudo" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kudo" ADD FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
