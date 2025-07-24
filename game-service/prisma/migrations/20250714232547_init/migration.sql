/*
  Warnings:

  - Made the column `player3Uuid` on table `game-service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `player4Uuid` on table `game-service` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentUuid" TEXT NOT NULL,
    "tournamentName" TEXT NOT NULL,
    "player1Uuid" TEXT NOT NULL,
    "player2Uuid" TEXT NOT NULL,
    "player3Uuid" TEXT NOT NULL,
    "player4Uuid" TEXT NOT NULL
);
INSERT INTO "new_tournament" ("id", "player1Uuid", "player2Uuid", "player3Uuid", "player4Uuid", "tournamentName", "tournamentUuid") SELECT "id", "player1Uuid", "player2Uuid", "player3Uuid", "player4Uuid", "tournamentName", "tournamentUuid" FROM "tournament";
DROP TABLE "tournament";
ALTER TABLE "new_tournament" RENAME TO "tournament";
CREATE UNIQUE INDEX "tournament_tournamentUuid_key" ON "tournament"("tournamentUuid");
CREATE UNIQUE INDEX "tournament_player1Uuid_key" ON "tournament"("player1Uuid");
CREATE UNIQUE INDEX "tournament_player2Uuid_key" ON "tournament"("player2Uuid");
CREATE UNIQUE INDEX "tournament_player3Uuid_key" ON "tournament"("player3Uuid");
CREATE UNIQUE INDEX "tournament_player4Uuid_key" ON "tournament"("player4Uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
