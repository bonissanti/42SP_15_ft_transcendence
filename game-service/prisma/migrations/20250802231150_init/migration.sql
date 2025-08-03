-- CreateTable
CREATE TABLE "Tournament" (
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
CREATE TABLE "History" (
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
CREATE TABLE "MatchMaking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchUuid" TEXT NOT NULL,
    "player1Username" TEXT NOT NULL,
    "player2Username" TEXT NOT NULL,
    "matchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_tournamentUuid_key" ON "Tournament"("tournamentUuid");

-- CreateIndex
CREATE UNIQUE INDEX "History_historyUuid_key" ON "History"("historyUuid");

-- CreateIndex
CREATE UNIQUE INDEX "MatchMaking_matchUuid_key" ON "MatchMaking"("matchUuid");

-- CreateIndex
CREATE UNIQUE INDEX "MatchMaking_player1Username_key" ON "MatchMaking"("player1Username");

-- CreateIndex
CREATE UNIQUE INDEX "MatchMaking_player2Username_key" ON "MatchMaking"("player2Username");
