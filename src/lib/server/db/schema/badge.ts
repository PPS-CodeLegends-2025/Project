import { mysqlTable, varchar, text, int, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const badge = mysqlTable('badge', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description').notNull(),
	icon: varchar('icon', { length: 255 }).notNull(),
	category: varchar('category', { length: 100 }).notNull(),
	level: int('level').notNull().default(1),
	hidden: boolean('hidden').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const userBadge = mysqlTable('user_badge', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	badgeId: varchar('badge_id', { length: 255 })
		.notNull()
		.references(() => badge.id),
	awardedAt: timestamp('awarded_at').notNull().defaultNow(),
	viewed: boolean('viewed').notNull().default(false)
});

export type Badge = typeof badge.$inferSelect;
export type UserBadge = typeof userBadge.$inferSelect;
export type BadgeInsert = typeof badge.$inferInsert;
export type UserBadgeInsert = typeof userBadge.$inferInsert;
