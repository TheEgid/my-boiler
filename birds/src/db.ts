import { PrismaClient } from "@prisma/client";

const userDb = process.env.NEXT_PUBLIC_DB_USER_DEV;
const passwordDb = process.env.NEXT_PUBLIC_DB_PASSWORD_DEV;
const nameDb = process.env.NEXT_PUBLIC_DB_NAME_DEV;

const databaseHost = process.platform === "win32" ? "localhost" : "full_db_postgres";

const DATABASE_URL = `postgresql://${userDb}:${passwordDb}@${databaseHost}:5432/${nameDb}`;

export const prisma = new PrismaClient({
    datasources: { db: { url: DATABASE_URL } },
    log: ["warn", "error", "info"],
});
