/*
  Warnings:

  - The `status` column on the `GameSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `PlayerInGame` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('Playing', 'Waiting');

-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('Waiting', 'Ready', 'Playing');

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "status",
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'Waiting';

-- AlterTable
ALTER TABLE "PlayerInGame" DROP COLUMN "status",
ADD COLUMN     "status" "PlayerStatus" NOT NULL DEFAULT 'Waiting';

-- DropEnum
DROP TYPE "Status";
