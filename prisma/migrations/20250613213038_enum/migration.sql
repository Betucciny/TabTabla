/*
  Warnings:

  - The `status` column on the `GameSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Playing', 'Waiting', 'Finished');

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Waiting';

-- AlterTable
ALTER TABLE "PlayerInGame" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Waiting';
