import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/mysql2/migrator';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = mysql.createPool(env.DATABASE_URL);
export const db = drizzle(client);

export async function applyMigrations() {
	await migrate(db, { migrationsFolder: 'migrations' });
}
