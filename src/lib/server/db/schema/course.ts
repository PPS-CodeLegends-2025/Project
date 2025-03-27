import { mysqlTable, int, varchar, json } from 'drizzle-orm/mysql-core';
import type { GeneratedTaskTemplate } from '../../services/taskgen';
import { createId } from '@paralleldrive/cuid2';

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

export const generatedTask = mysqlTable('generated_task', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(createId),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 512 }).notNull(),
	inputs: json('inputs').notNull().$type<GeneratedTaskTemplate['inputs']>(),
	output: json('output').notNull().$type<GeneratedTaskTemplate['output']>(),
	exampleData: json('example_data').notNull(),
	exampleCode: varchar('example_code', { length: 1024 }).notNull()
});

export type Course = typeof course.$inferSelect;
export type CourseModule = typeof courseModule.$inferSelect;
export type GeneratedTask = typeof generatedTask.$inferSelect;
