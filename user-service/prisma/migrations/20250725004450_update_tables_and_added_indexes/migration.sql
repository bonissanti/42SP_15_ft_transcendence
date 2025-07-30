/*
  Warnings:

  - You are about to drop the `_ReceiveRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ReceiveRequests";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE INDEX "Friendship_uuid_receiverUuid_senderUuid_idx" ON "Friendship"("uuid", "receiverUuid", "senderUuid");

-- CreateIndex
CREATE INDEX "User_uuid_username_idx" ON "User"("uuid", "username");
