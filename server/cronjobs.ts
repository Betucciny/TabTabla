import cron from "node-cron";
import { prisma } from "./prisma";

async function deleteOldGames() {
  await prisma.gameSession.deleteMany({
    where: {
      updatedAt: {
        lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });
}

export function createCronJobs() {
  console.log("Creating cron jobs...");
  cron.schedule("0 * * * *", () => {
    console.log("Running tasks daily...");
    deleteOldGames();
  });
}
