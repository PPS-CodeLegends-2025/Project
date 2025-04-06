import { mysqlTable, int, varchar, json, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';
import { user } from './user';
import type { GeneratedTaskTemplate } from '$services/taskgen';

export const challenge = mysqlTable('challenge', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	title: varchar('title', { length: 32 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	difficulty: varchar('difficulty', { length: 32 }).notNull(),
	category: varchar('category', { length: 32 }).notNull(),
	xp: int('xp').notNull(),
	timeEstimate: varchar('time_estimate', { length: 32 }).notNull()
});

export const challengeTask = mysqlTable('challenge_task', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(createId),
	challengeId: varchar('challenge_id', { length: 255 })
		.notNull()
		.references(() => challenge.id),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 1024 }).notNull(),
	inputs: json('inputs').notNull().$type<GeneratedTaskTemplate['inputs']>(),
	output: json('output').notNull().$type<GeneratedTaskTemplate['output']>(),
	exampleCode: varchar('example_code', { length: 1024 }).notNull()
});

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

export type Challenge = typeof challenge.$inferInsert;
export type ChallengeTask = typeof challengeTask.$inferSelect;
export type ChallengeProgress = typeof challengeProgress.$inferSelect;
