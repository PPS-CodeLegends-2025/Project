import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { logger } from '$logger';

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
		logger.info('Starting database migrations...');
		await migrate(db, { migrationsFolder: 'migrations' });
		logger.info('Migrations completed successfully');
	} catch (error: unknown) {
		if (isMySQLError(error) && error.code === 'ER_TABLE_EXISTS_ERROR') {
			logger.warn(`Migration warning: ${error.sqlMessage}`);
			logger.warn('Continuing application startup despite migration warning');
		} else {
			logger.error('Migration error:', error);
			throw error;
		}
	}
}
