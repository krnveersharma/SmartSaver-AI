/*
  Warnings:

  - You are about to drop the `SaveMoney` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaveMoney" DROP CONSTRAINT "SaveMoney_userId_fkey";

-- DropTable
DROP TABLE "SaveMoney";

-- CreateTable
CREATE TABLE "Savemoney" (
    "id" TEXT NOT NULL,
    "saving" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Savemoney_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Savemoney_userId_key" ON "Savemoney"("userId");

-- AddForeignKey
ALTER TABLE "Savemoney" ADD CONSTRAINT "Savemoney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Signup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
