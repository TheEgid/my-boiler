/* eslint-disable */
import * as fs from "fs";
import { Database } from "sqlite3";

const databasePath = "../prisma/sql-lite-database.db";
const backupFilePath = "../_BACKUP/database_dump.sql";
const db = new Database(databasePath);
const backupStream = fs.createWriteStream(backupFilePath);

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables: { name: string }[]) => {
    if (err) throw err;

    tables.forEach((table) => {
        const tableName: string = table.name;

        db.all(`PRAGMA table_info(${tableName})`, (err, columns: { name: string; type: string }[]) => {
            if (err) throw err;

            const createTableStatement: string = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.map((col) => `${col.name} ${mapSqliteToPostgresType(col.type)}`).join(", ")});`;
            backupStream.write(createTableStatement + "\n");

            db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
                if (err) throw err;
                rows.forEach((row) => {
                    const values = Object.values(row)
                        .map((value) => JSON.stringify(value))
                        .join(", ");
                    const insertStatement = `INSERT INTO ${tableName} VALUES (${values});`;
                    backupStream.write(insertStatement + "\n");
                });
            });
        });
    });

    db.close((err: Error | null) => {
        if (err) throw err;
        backupStream.end();
        console.log(`Full database backup created successfully at ${backupFilePath}`);
    });
});

const mapSqliteToPostgresType = (sqliteType: string): string => {
    switch (sqliteType.toLowerCase()) {
        case "integer":
            return "SERIAL";
        case "text":
            return "TEXT";
        case "real":
            return "REAL";
        default:
            return sqliteType;
    }
};
