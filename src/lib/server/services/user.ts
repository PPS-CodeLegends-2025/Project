import { hash, verify } from '@node-rs/argon2';
import { db } from '../db';
import * as table from '$lib/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { modules } from './modules';
import { logger } from '$server/logger';

const hashOptions = {
	memoryCost: 4096,
	timeCost: 2,
	outputLen: 32,
	parallelism: 4
} as const;

export const userService = {
	async register(username: string, password: string, fullName?: string) {
		const passwordHash = await hash(password, hashOptions);
		const [res] = await db
			.insert(table.user)
			.values({
				username,
				fullName,
				passwordHash,
				level: 1,
				xp: 0
			})
			.$returningId();

		const [newUser] = await db
			.select({
				id: table.user.id,
				username: table.user.username
			})
			.from(table.user)
			.where(eq(table.user.id, res.id));

		return newUser;
	},

	async exists(username: string) {
		const results = await db.select().from(table.user).where(eq(table.user.username, username));
		return results.length > 0;
	},

	async login(username: string, password: string) {
		const [user] = await db.select().from(table.user).where(eq(table.user.username, username));

		if (!user) return null;

		const validPassword = await verify(user.passwordHash, password, hashOptions);

		if (!validPassword) return null;

		return {
			id: user.id,
			username: user.username,
			registrationDate: user.registrationDate
		};
	},

	async getSectionProgress(userId: string, moduleId: string) {
		try {
			const completedSections = await db
				.select({ sectionIndex: table.moduleProgress.sectionIndex })
				.from(table.moduleProgress)
				.where(
					and(eq(table.moduleProgress.userId, userId), eq(table.moduleProgress.moduleId, moduleId))
				);

			const lastCompleted = await db
				.select()
				.from(table.moduleProgress)
				.where(
					and(eq(table.moduleProgress.userId, userId), eq(table.moduleProgress.moduleId, moduleId))
				)
				.orderBy(table.moduleProgress.completedAt)
				.limit(1);

			return {
				completedSections: completedSections.map((section) => section.sectionIndex),
				lastCompletedSection: lastCompleted.length > 0 ? lastCompleted[0].sectionIndex : null
			};
		} catch (error) {
			logger.error('Error getting section progress:', error);
			return {
				completedSections: [],
				lastCompletedSection: null
			};
		}
	},

	async getUserStats(userId: string) {
		try {
			const [userStats] = await db
				.select()
				.from(table.userStats)
				.where(eq(table.userStats.userId, userId));

			if (userStats) {
				return {
					lessonsCompleted: userStats.lessonsCompleted,
					challengesSolved: userStats.challengesSolved,
					daysActive: userStats.daysActive,
					lastActiveDate: userStats.lastActiveDate ? userStats.lastActiveDate.toISOString() : null
				};
			}

			const completedLessons = await db
				.select({ count: sql<number>`COUNT(*)` })
				.from(table.moduleProgress)
				.where(eq(table.moduleProgress.userId, userId));

			const activeDays = await db
				.select({ count: sql<number>`COUNT(DISTINCT DATE(completed_at))` })
				.from(table.moduleProgress)
				.where(eq(table.moduleProgress.userId, userId));

			const challengesCompleted = await db
				.select({ count: sql<number>`COUNT(*)` })
				.from(table.challengeProgress)
				.where(
					and(
						eq(table.challengeProgress.userId, userId),
						eq(table.challengeProgress.completed, true)
					)
				);

			const lessonsCount = completedLessons[0]?.count || 0;
			const daysCount = activeDays[0]?.count || 0;
			const challengesCount = challengesCompleted[0]?.count || 0;
			const currentDate = new Date();

			await db.insert(table.userStats).values({
				userId,
				lessonsCompleted: lessonsCount,
				challengesSolved: challengesCount,
				daysActive: daysCount,
				lastActiveDate: currentDate
			} as table.UserStatsInsert);

			return {
				lessonsCompleted: lessonsCount,
				challengesSolved: challengesCount,
				daysActive: daysCount,
				lastActiveDate: currentDate.toISOString()
			};
		} catch (error) {
			logger.error('Error getting user stats:', error);
			return {
				lessonsCompleted: 0,
				challengesSolved: 0,
				daysActive: 0,
				lastActiveDate: null
			};
		}
	},

	async incrementLessonCompletion(userId: string) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		try {
			const [existingStats] = await db
				.select()
				.from(table.userStats)
				.where(eq(table.userStats.userId, userId));

			if (existingStats) {
				await db
					.update(table.userStats)
					.set({
						lessonsCompleted: existingStats.lessonsCompleted + 1,
						lastActiveDate: new Date()
					})
					.where(eq(table.userStats.userId, userId));
			} else {
				await db.insert(table.userStats).values({
					userId,
					lessonsCompleted: 1,
					daysActive: 1,
					lastActiveDate: new Date()
				});
			}

			await this.recordUserActivity(userId);

			return true;
		} catch (error) {
			logger.error('Error incrementing lesson completion:', error);
			return false;
		}
	},

	async recordUserActivity(userId: string) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		try {
			const [existingActivity] = await db
				.select()
				.from(table.userActiveDays)
				.where(
					and(eq(table.userActiveDays.userId, userId), eq(table.userActiveDays.activeDate, today))
				);

			if (!existingActivity) {
				await db.insert(table.userActiveDays).values({
					userId,
					activeDate: today
				});

				await db
					.update(table.userStats)
					.set({
						daysActive: sql`days_active + 1`,
						lastActiveDate: today
					})
					.where(eq(table.userStats.userId, userId));
			}

			return true;
		} catch (error) {
			logger.error('Error recording user activity:', error);
			return false;
		}
	},

	async getUserModuleProgress(userId: string) {
		const moduleList = modules.list();
		const moduleProgress = await Promise.all(
			moduleList.map(async (mod) => {
				const modulePath = mod.url;
				const moduleData = modules.map()[modulePath];
				const progress = await modules.getModuleProgress(userId, modulePath);
				const completedSections = await modules.getCompletedSections(userId, modulePath);

				return {
					...mod,
					progress,
					completedSections,
					totalSections: moduleData?.sections?.length || 0,
					completed: progress === 100,
					inProgress: progress > 0 && progress < 100
				};
			})
		);

		return {
			modules: moduleProgress,
			completedModules: moduleProgress.filter((m) => m.completed),
			inProgressModules: moduleProgress.filter((m) => m.inProgress)
		};
	}
};
