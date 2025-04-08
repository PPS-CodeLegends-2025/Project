import { mysqlTable, varchar, int, timestamp } from 'drizzle-orm/mysql-core';
import { createId } from '@paralleldrive/cuid2';
import { user } from './user';

export const moduleProgress = mysqlTable('module_progress', {
	id: varchar('id', { length: 255 }).primaryKey().$defaultFn(createId),
	userId: varchar('user_id', { length: 255 })
		.notNull()
		.references(() => user.id),
	moduleId: varchar('module_id', { length: 255 }).notNull(),
	sectionIndex: int('section_index').notNull(),
	completedAt: timestamp('completed_at').notNull().defaultNow()
});

export type ModuleProgress = typeof moduleProgress.$inferSelect;
