-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "shortCode" VARCHAR(10) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "hostPlayerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "initialDeckOrder" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "drawnCards" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerInGame" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "socketId" TEXT,
    "playerTabla" TEXT[],
    "isWinner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerInGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_shortCode_key" ON "GameSession"("shortCode");

-- CreateIndex
CREATE INDEX "GameSession_shortCode_idx" ON "GameSession"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerInGame_gameSessionId_name_key" ON "PlayerInGame"("gameSessionId", "name");

-- AddForeignKey
ALTER TABLE "PlayerInGame" ADD CONSTRAINT "PlayerInGame_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
