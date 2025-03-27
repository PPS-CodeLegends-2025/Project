import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/mysql2/migrator';

interface MySQLError extends Error {
	code: string;
	sqlMessage?: string;
}

function isMySQLError(error: unknown): error is MySQLError {
	return (
		error instanceof Error && 'code' in error && typeof (error as MySQLError).code === 'string'
	);
}

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = mysql.createPool(env.DATABASE_URL);
export const db = drizzle(client);

export async function applyMigrations() {
	try {
		console.log('Starting database migrations...');
		await migrate(db, { migrationsFolder: 'migrations' });
		console.log('Migrations completed successfully');
	} catch (error: unknown) {
		if (isMySQLError(error) && error.code === 'ER_TABLE_EXISTS_ERROR') {
			console.warn(`Migration warning: ${error.sqlMessage}`);
			console.warn('Continuing application startup despite migration warning');
		} else {
			console.error('Migration error:', error);
			throw error;
		}
	}
}
