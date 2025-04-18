import sqlite3 from 'sqlite3';

export class SQLiteHandler
{
    public Database: sqlite3.Database | undefined;

    constructor()
    {
    }

    public createDatabase()
    {
        this.Database = new sqlite3.Database('./db-trans.db', sqlite3.OPEN_CREATE);
    }

    public readonlyDatabase()
    {
        this.Database = new sqlite3.Database('./db-trans.db', sqlite3.OPEN_READONLY);
    }

    public readWriteDatabase()
    {
        this.Database = new sqlite3.Database('./db-trans.db', sqlite3.OPEN_READWRITE);
    }
}