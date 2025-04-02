import { mysqlTable, varchar, int, date } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const userStats = mysqlTable('user_stats', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	lessonsCompleted: int('lessons_completed').notNull().default(0),
	challengesSolved: int('challenges_solved').notNull().default(0),
	daysActive: int('days_active').notNull().default(0),
	lastActiveDate: date('last_active_date')
});

export const userActiveDays = mysqlTable('user_active_days', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	activeDate: date('active_date').notNull()
});

export type UserStats = typeof userStats.$inferSelect;
export type UserStatsInsert = typeof userStats.$inferInsert;
export type UserActiveDays = typeof userActiveDays.$inferSelect;
