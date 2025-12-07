import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in environment variables");
}

const sql = neon(process.env.DATABASE_URL);

const db = global.db || drizzle(sql, { schema });

if (process.env.NODE_ENV !== "production") {
    global.db = db;
}

export { db };