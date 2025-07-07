import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH || './data/app.db', { verbose: console.log });

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    time INTEGER NOT NULL
  );
`);

export default db;
