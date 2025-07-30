-- CreateTable
CREATE TABLE "Friendship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "receiverUuid" TEXT NOT NULL,
    "senderUuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Friendship_senderUuid_fkey" FOREIGN KEY ("senderUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friendship_receiverUuid_fkey" FOREIGN KEY ("receiverUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReceiveRequests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ReceiveRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "Friendship" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReceiveRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_uuid_key" ON "Friendship"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_senderUuid_receiverUuid_key" ON "Friendship"("senderUuid", "receiverUuid");

-- CreateIndex
CREATE UNIQUE INDEX "_ReceiveRequests_AB_unique" ON "_ReceiveRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_ReceiveRequests_B_index" ON "_ReceiveRequests"("B");
