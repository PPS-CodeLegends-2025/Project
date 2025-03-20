import { mysqlTable, int, varchar, datetime, json } from 'drizzle-orm/mysql-core';
import type { GeneratedTask } from '../services/taskgen';
import { createId } from '@paralleldrive/cuid2';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey().$defaultFn(createId),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull()
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const generatedTask = mysqlTable('generated_task', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(createId),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	inputs: json('inputs').notNull().$type<GeneratedTask['inputs']>(),
	output: json('output').notNull().$type<GeneratedTask['output']>(),
	exampleData: json('example_data').notNull(),
	exampleCode: varchar('example_code', { length: 1024 }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
