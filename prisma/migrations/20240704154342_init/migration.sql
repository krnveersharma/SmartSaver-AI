-- CreateTable
CREATE TABLE "SaveMoney" (
    "id" TEXT NOT NULL,
    "saving" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SaveMoney_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaveMoney_userId_key" ON "SaveMoney"("userId");

-- AddForeignKey
ALTER TABLE "SaveMoney" ADD CONSTRAINT "SaveMoney_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Signup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
