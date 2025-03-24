import { mysqlTable, int, varchar, datetime, json, timestamp } from 'drizzle-orm/mysql-core';
import type { GeneratedTask } from '../services/taskgen';
import { createId } from '@paralleldrive/cuid2';


export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey().$defaultFn(createId),
	age: int('age'),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	email: varchar('email', {length:127}),
	level: int('level').notNull(),
	xp: int('xp_points').notNull(),
	registrationDate: timestamp('registration_date').notNull().defaultNow()
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

export const course = mysqlTable('course', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	complexity: varchar('complexity', {length:32}),
	duration: int('duration')
})

export const gamification = mysqlTable('gamification',{
	id: varchar('id', {length: 32}).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', {length: 255})
		.notNull()
		.references(() => user.id),
	badge: varchar('badge').notNull(),
	receiptDate: datetime('receipt_date').notNull()
})

export const leaderboard = mysqlTable('leaderboard',{
	id: varchar('id', {length: 32}).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', {length: 255})
		.notNull()
		.references(() => user.id),
	points: int('points').notNull()
})


export const courseModule = mysqlTable('course_module',{
	id: varchar('id', {length: 32}).primaryKey().$defaultFn(createId),
	name: varchar('username', { length: 32 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	courseId: varchar('course_id', {length: 32})
		.notNull()
		.references(() => course.id)
})

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Course = typeof course.$inferSelect;

export type Gamification = typeof gamification.$inferSelect;

export type Leaderboard = typeof leaderboard.$inferSelect;

export type CourseModule = typeof courseModule.$inferSelect;