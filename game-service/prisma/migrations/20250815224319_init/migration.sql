-- CreateTable
CREATE TABLE "game-service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentUuid" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "player1Uuid" TEXT NOT NULL,
    "player2Uuid" TEXT NOT NULL,
    "player3Uuid" TEXT NOT NULL,
    "player4Uuid" TEXT NOT NULL,
    "aliasPlayer1" TEXT,
    "aliasPlayer2" TEXT,
    "aliasPlayer3" TEXT,
    "aliasPlayer4" TEXT
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "historyUuid" TEXT NOT NULL,
    "tournamentId" TEXT,
    "tournamentName" TEXT,
    "gameType" TEXT,
    "player1Uuid" TEXT NOT NULL,
    "player1Alias" TEXT,
    "player1Points" INTEGER NOT NULL,
    "player2Uuid" TEXT NOT NULL,
    "player2Alias" TEXT,
    "player2Points" INTEGER NOT NULL,
    "player3Uuid" TEXT,
    "player3Alias" TEXT,
    "player3Points" INTEGER,
    "player4Uuid" TEXT,
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
CREATE UNIQUE INDEX "history_tournamentId_key" ON "history"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_matchUuid_key" ON "matchmaking"("matchUuid");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player1Username_key" ON "matchmaking"("player1Username");

-- CreateIndex
CREATE UNIQUE INDEX "matchmaking_player2Username_key" ON "matchmaking"("player2Username");
