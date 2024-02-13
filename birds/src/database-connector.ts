import { PrismaClient } from "@prisma/client";

// const userDb = process.env.NEXT_PUBLIC_DB_USER_DEV;
// const passwordDb = process.env.NEXT_PUBLIC_DB_PASSWORD_DEV;
// const nameDb = process.env.NEXT_PUBLIC_DB_NAME_DEV;

// // const databaseHost = process.platform === "win32" ? "localhost" : "full_db_postgres";

const DATABASE_URL = process.env.DATABASE_URL; //`postgresql://${userDb}:${passwordDb}@${databaseHost}:5432/${nameDb}`;

const prismaClientSingleton = () =>
    new PrismaClient({
        datasources: { db: { url: DATABASE_URL } },
        // log: ["query", "info",],
        log: ["warn", "error"],
    });

declare global {
    const prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = ((global as any)?.prisma as ReturnType<typeof prismaClientSingleton>) ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") {
//     (global as any).prisma = prisma;
// }

export default prisma;
