import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import * as dotenv from 'dotenv';

dotenv.config();

async function applyMigrations() {
	console.log('Starting migrations...');

	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not set in environment variables');
	}

	const pool = createPool(process.env.DATABASE_URL);
	const db = drizzle(pool);

	try {
		await migrate(db, { migrationsFolder: 'migrations' });
		console.log('Migrations completed successfully');
	} catch (error) {
		if (error.code === 'ER_TABLE_EXISTS_ERROR') {
			console.warn(`Migration warning: ${error.sqlMessage}`);
			console.warn('Continuing despite migration warning');
		} else {
			console.error('Migration error:', error);
			throw error;
		}
	} finally {
		await pool.end();
	}
}

console.log('Starting database migration...');

try {
	await applyMigrations();
	console.log('Migration completed successfully');
	process.exit(0);
} catch (error) {
	console.error('Migration failed:', error);
	process.exit(1);
}
