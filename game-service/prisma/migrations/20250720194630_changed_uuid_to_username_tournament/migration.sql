/*
  Warnings:

  - You are about to drop the `tournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tournament";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "game-service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentUuid" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "player3Username" TEXT NOT NULL,
    "player4Username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "historyUuid" TEXT NOT NULL,
    "tournamentName" TEXT,
    "player1Username" TEXT NOT NULL,
    "player1Points" INTEGER NOT NULL,
    "player2Username" TEXT NOT NULL,
    "player2Points" INTEGER NOT NULL,
    "player3Username" TEXT,
    "player3Points" INTEGER,
    "player4Username" TEXT,
    "player4Points" INTEGER,
    "matchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "matchmaking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchUuid" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "matchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "game-service_tournamentUuid_key" ON "game-service"("tournamentUuid");

-- CreateIndex
CREATE UNIQUE INDEX "game-service_player1Username_key" ON "game-service"("player1Username");

-- CreateIndex
CREATE UNIQUE INDEX "game-service_player2Username_key" ON "game-service"("player2Username");

-- CreateIndex
CREATE UNIQUE INDEX "game-service_player3Username_key" ON "game-service"("player3Username");

-- CreateIndex
CREATE UNIQUE INDEX "game-service_player4Username_key" ON "game-service"("player4Username");

-- CreateIndex
CREATE UNIQUE INDEX "history_historyUuid_key" ON "history"("historyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_matchUuid_key" ON "matchmaking"("matchUuid");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player1Username_key" ON "matchmaking"("player1Username");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player2Username_key" ON "matchmaking"("player2Username");
