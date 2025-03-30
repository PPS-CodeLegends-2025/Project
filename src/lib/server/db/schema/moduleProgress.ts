import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';
import { user } from './user';

export const moduleProgress = mysqlTable('module_progress', {
	id: varchar('id', { length: 255 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	moduleId: varchar('module_id', { length: 255 }).notNull(),
	sectionIndex: int('section_index').notNull(),
	completedAt: timestamp('completed_at').notNull().defaultNow()
});

export const userCourseProgress = mysqlTable('user_course_progress', {
	id: varchar('id', { length: 32 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	courseId: varchar('course_id', { length: 32 }).notNull(),
	completed: int('completed').notNull().default(0),
	total: int('total').notNull().default(0)
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

export type ModuleProgress = typeof moduleProgress.$inferSelect;
export type UserCourseProgress = typeof userCourseProgress.$inferSelect;
export type UserSectionProgress = typeof userSectionProgress.$inferSelect;
