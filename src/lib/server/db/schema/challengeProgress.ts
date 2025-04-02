import { mysqlTable, varchar, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const challengeProgress = mysqlTable('challenge_progress', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	challengeId: varchar('challenge_id', { length: 255 }).notNull(),
	completed: boolean('completed').notNull().default(false),
	completedAt: timestamp('completed_at').defaultNow()
});

export type ChallengeProgress = typeof challengeProgress.$inferSelect;
