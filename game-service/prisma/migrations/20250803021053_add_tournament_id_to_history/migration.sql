/*
  Warnings:

  - A unique constraint covering the columns `[tournamentId]` on the table `history` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "history" ADD COLUMN "tournamentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "history_tournamentId_key" ON "history"("tournamentId");
