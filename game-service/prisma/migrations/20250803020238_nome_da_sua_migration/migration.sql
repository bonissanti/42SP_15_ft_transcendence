/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MatchMaking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tournament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "History";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MatchMaking";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tournament";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "game-service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentUuid" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "player3Username" TEXT NOT NULL,
    "player4Username" TEXT NOT NULL,
    "aliasPlayer1" TEXT,
    "aliasPlayer2" TEXT,
    "aliasPlayer3" TEXT,
    "aliasPlayer4" TEXT
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "historyUuid" TEXT NOT NULL,
    "tournamentName" TEXT,
    "player1Username" TEXT NOT NULL,
    "player1Alias" TEXT,
    "player1Points" INTEGER NOT NULL,
    "player2Username" TEXT NOT NULL,
    "player2Alias" TEXT,
    "player2Points" INTEGER NOT NULL,
    "player3Username" TEXT,
    "player3Alias" TEXT,
    "player3Points" INTEGER,
    "player4Username" TEXT,
    "player4Alias" TEXT,
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
CREATE UNIQUE INDEX "history_historyUuid_key" ON "history"("historyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_matchUuid_key" ON "matchmaking"("matchUuid");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player1Username_key" ON "matchmaking"("player1Username");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player2Username_key" ON "matchmaking"("player2Username");
