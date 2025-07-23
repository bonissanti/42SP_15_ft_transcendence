-- CreateTable
CREATE TABLE "tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentUuid" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "player1Uuid" TEXT NOT NULL,
    "player2Uuid" TEXT NOT NULL,
    "player3Uuid" TEXT,
    "player4Uuid" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "tournament_tournamentUuid_key" ON "tournament"("tournamentUuid");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_player1Uuid_key" ON "tournament"("player1Uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_player2Uuid_key" ON "tournament"("player2Uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_player3Uuid_key" ON "tournament"("player3Uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_player4Uuid_key" ON "tournament"("player4Uuid");
