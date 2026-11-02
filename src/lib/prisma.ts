import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

function getPrismaClient(): PrismaClient | null {
  // Only attempt to initialize if DATABASE_URL is genuinely configured and points to a running DB
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost:5432/marlow_reed_db")) {
    return null;
  }

  try {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: ["error"],
      });
    }
    return globalForPrisma.prisma;
  } catch {
    return null;
  }
}

export const prisma = getPrismaClient();
