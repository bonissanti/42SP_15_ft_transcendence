-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePic" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "loses" INTEGER NOT NULL DEFAULT 0,
    "auth0Id" TEXT,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT
);
INSERT INTO "new_User" ("auth0Id", "createdAt", "email", "id", "isOnline", "lastLogin", "loses", "matchesPlayed", "password", "profilePic", "username", "uuid", "wins") SELECT "auth0Id", "createdAt", "email", "id", "isOnline", "lastLogin", "loses", "matchesPlayed", "password", "profilePic", "username", "uuid", "wins" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");
CREATE INDEX "User_uuid_username_idx" ON "User"("uuid", "username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
