import { PrismaClient } from "@prisma/client";

const userDb = process.env.NEXT_PUBLIC_DB_USER;
const passwordDb = process.env.NEXT_PUBLIC_DB_PASSWORD;
const nameDb = process.env.NEXT_PUBLIC_DB_NAME;

const databaseHost = "pgcontainer";

// process.env.DATABASE_URL_PROD = `postgresql://${userDb}:${passwordDb}@${databaseHost}:5432/${nameDb}`;

const dbUrl =
    process.platform === "win32" ? process.env.DATABASE_URL_DEV : `postgresql://${userDb}:${passwordDb}@${databaseHost}:5432/${nameDb}`;

const prismaClientSingleton = (): PrismaClient =>
    new PrismaClient({
        datasources: { db: { url: dbUrl } },
        // log: ["query", "info",],
        log: ["warn", "error"],
    });

declare global {
    const prisma: undefined | PrismaClient;
}

const prisma = ((global as any)?.prisma as PrismaClient) ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") {
//     (global as any).prisma = prisma;
// }

export default prisma;
