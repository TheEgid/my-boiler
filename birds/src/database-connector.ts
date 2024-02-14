import { PrismaClient } from "@prisma/client";

// const userDb = process.env.NEXT_PUBLIC_DB_USER_DEV;
// const passwordDb = process.env.NEXT_PUBLIC_DB_PASSWORD_DEV;
// const nameDb = process.env.NEXT_PUBLIC_DB_NAME_DEV;

// const databaseHost = process.platform === "win32" ? "localhost" : "full_db_postgres";

const dbUrl = process.env.DATABASE_URL_DEV;
// const dbUrl = process.platform === "win32" ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL_PROD;
// `postgresql://${userDb}:${passwordDb}@${databaseHost}:5432/${nameDb}`;

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
