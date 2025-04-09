import { mysqlTable, int, varchar, datetime, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey().$defaultFn(createId),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	fullName: varchar('full_name', { length: 255 }).notNull().default(''),
	level: int('level').notNull().default(0),
	xp: int('xp_points').notNull().default(0),
	registrationDate: timestamp('registration_date').notNull().defaultNow(),
	bio: varchar('bio', { length: 256 }).notNull().default(''),
	admin: boolean('admin').notNull().default(false)
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const achievement = mysqlTable('achievement', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	name: varchar('name', { length: 255 }).notNull(),
	receiptDate: datetime('receipt_date').notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Achievement = typeof achievement.$inferSelect;
