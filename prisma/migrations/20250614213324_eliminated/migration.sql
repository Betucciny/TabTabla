/*
  Warnings:

  - The values [Eliminated] on the enum `GameStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameStatus_new" AS ENUM ('Playing', 'Waiting');
ALTER TABLE "GameSession" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GameSession" ALTER COLUMN "status" TYPE "GameStatus_new" USING ("status"::text::"GameStatus_new");
ALTER TYPE "GameStatus" RENAME TO "GameStatus_old";
ALTER TYPE "GameStatus_new" RENAME TO "GameStatus";
DROP TYPE "GameStatus_old";
ALTER TABLE "GameSession" ALTER COLUMN "status" SET DEFAULT 'Waiting';
COMMIT;

-- AlterEnum
ALTER TYPE "PlayerStatus" ADD VALUE 'Eliminated';
