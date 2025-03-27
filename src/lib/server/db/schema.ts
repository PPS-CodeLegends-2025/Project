import { mysqlTable, int, varchar, datetime, json, timestamp } from 'drizzle-orm/mysql-core';
import type { GeneratedTaskTemplate } from '../services/taskgen';
import { createId } from '@paralleldrive/cuid2';
import { moduleProgress as moduleProgressTable } from './schema/moduleProgress';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey().$defaultFn(createId),
	username: varchar('username', { length: 32 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	fullName: varchar('full_name', { length: 255 }).notNull().default(''),
	level: int('level').notNull().default(0),
	xp: int('xp_points').notNull().default(0),
	registrationDate: timestamp('registration_date').notNull().defaultNow(),
	bio: varchar('bio', { length: 256 }).notNull().default('')
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	expiresAt: datetime('expires_at').notNull()
});

export const course = mysqlTable('course', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	level: varchar('level', { length: 32 }),
	duration: int('duration')
});

export const courseModule = mysqlTable('course_module', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	name: varchar('username', { length: 32 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	courseId: varchar('course_id', { length: 32 })
		.notNull()
		.references(() => course.id)
});

export const achievement = mysqlTable('achievement', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	name: varchar('name', { length: 255 }).notNull(),
	receiptDate: datetime('receipt_date').notNull()
});

export const userCourseProgress = mysqlTable('user_course_progress', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	courseId: varchar('course_id', { length: 32 })
		.notNull()
		.references(() => course.id),
	completed: int('completed').notNull().default(0),
	total: int('total').notNull().default(0)
});

export const generatedTask = mysqlTable('generated_task', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(createId),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	inputs: json('inputs').notNull().$type<GeneratedTaskTemplate['inputs']>(),
	output: json('output').notNull().$type<GeneratedTaskTemplate['output']>(),
	exampleData: json('example_data').notNull(),
	exampleCode: varchar('example_code', { length: 1024 }).notNull()
});

export const userSectionProgress = mysqlTable('user_section_progress', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	moduleId: varchar('module_id', { length: 255 }).notNull(),
	sectionId: varchar('section_id', { length: 255 }).notNull(),
	completedAt: timestamp('completed_at').notNull().defaultNow()
});

export const moduleProgress = moduleProgressTable;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Achievement = typeof achievement.$inferSelect;

export type Course = typeof course.$inferSelect;

export type CourseModule = typeof courseModule.$inferSelect;

export type UserCourseProgress = typeof userCourseProgress.$inferSelect;

export type GeneratedTask = typeof generatedTask.$inferSelect;

export type UserSectionProgress = typeof userSectionProgress.$inferSelect;

export type ModuleProgress = typeof moduleProgress.$inferSelect;

/*
export const leaderboard = mysqlTable('leaderboard', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	points: int('points').notNull()
});

export type Leaderboard = typeof leaderboard.$inferSelect;
*/
