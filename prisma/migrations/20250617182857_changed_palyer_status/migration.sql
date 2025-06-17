/*
  Warnings:

  - The values [Ready] on the enum `PlayerStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `socketId` on the `PlayerInGame` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlayerStatus_new" AS ENUM ('Waiting', 'Playing', 'Eliminated');
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" TYPE "PlayerStatus_new" USING ("status"::text::"PlayerStatus_new");
ALTER TYPE "PlayerStatus" RENAME TO "PlayerStatus_old";
ALTER TYPE "PlayerStatus_new" RENAME TO "PlayerStatus";
DROP TYPE "PlayerStatus_old";
ALTER TABLE "PlayerInGame" ALTER COLUMN "status" SET DEFAULT 'Waiting';
COMMIT;

-- AlterTable
ALTER TABLE "PlayerInGame" DROP COLUMN "socketId";
