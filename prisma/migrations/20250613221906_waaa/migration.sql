/*
  Warnings:

  - The values [Finished] on the enum `PlayerStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlayerStatus_new" AS ENUM ('Waiting', 'Ready', 'Playing');
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" TYPE "PlayerStatus_new" USING ("status"::text::"PlayerStatus_new");
ALTER TYPE "PlayerStatus" RENAME TO "PlayerStatus_old";
ALTER TYPE "PlayerStatus_new" RENAME TO "PlayerStatus";
DROP TYPE "PlayerStatus_old";
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" SET DEFAULT 'Waiting';
COMMIT;

-- CreateIndex
CREATE INDEX "PlayerInGame_gameSessionId_idx" ON "PlayerInGame"("gameSessionId");
