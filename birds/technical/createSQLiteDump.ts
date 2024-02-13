/* eslint-disable */
import * as fs from "fs";
import { Database } from "sqlite3";

const databasePath = "../prisma/sql-lite-database.db";
const dumpFilePath = "../_BACKUP/database_dump.sql";
const db = new Database(databasePath);

const dumpStream = fs.createWriteStream(dumpFilePath);

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables: { name: string }[]) => {
    if (err) throw err;
    tables.forEach((table) => {
        const tableName = table.name;
        db.each(`SELECT * FROM ${tableName}`, (err, row) => {
            if (err) throw err;
            const insertStatement = `INSERT INTO ${tableName} VALUES (${Object.values(row)
                .map((value) => JSON.stringify(value))
                .join(", ")});`;
            dumpStream.write(insertStatement + "\n");
        });
    });

    db.close((err: any) => {
        if (err) throw err;
        dumpStream.end();
        console.log(`SQL dump created successfully at ${dumpFilePath}`);
    });
});
