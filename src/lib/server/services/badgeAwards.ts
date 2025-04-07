import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { and, eq, count } from 'drizzle-orm';
import { badgeService } from './badge';

const BADGES = {
	FIRST_MODULE: 'first-module-complete',
	FIVE_MODULES: 'five-modules-complete',
	TEN_MODULES: 'ten-modules-complete',
	FIRST_CHALLENGE: 'first-challenge-complete',
	FIVE_CHALLENGES: 'five-challenges-complete',
	FIRST_LOGIN_STREAK: 'three-day-streak',
	WEEK_LOGIN_STREAK: 'week-streak',
	LEVEL_2: 'apprentice',
	LEVEL_5: 'journeyman',
	LEVEL_10: 'artisan',
	LEVEL_15: 'mastermind',
	LEVEL_20: 'legend',
	LEVEL_25: 'prestige'
};

export const badgeAwards = {
	async checkModuleCompletionBadges(userId: string): Promise<void> {
		const completedModulesResult = await db
			.select({ count: count() })
			.from(table.moduleProgress)
			.where(eq(table.moduleProgress.userId, userId));

		const completedCount = completedModulesResult[0]?.count || 0;

		if (completedCount >= 1) {
			await badgeService.awardBadge(userId, BADGES.FIRST_MODULE);
		}

		if (completedCount >= 5) {
			await badgeService.awardBadge(userId, BADGES.FIVE_MODULES);
		}

		if (completedCount >= 10) {
			await badgeService.awardBadge(userId, BADGES.TEN_MODULES);
		}
	},

	async checkChallengeCompletionBadges(userId: string): Promise<void> {
		const completedChallengesResult = await db
			.select({ count: count() })
			.from(table.challengeProgress)
			.where(
				and(eq(table.challengeProgress.userId, userId), eq(table.challengeProgress.completed, true))
			);

		const challengeCount = completedChallengesResult[0]?.count || 0;

		if (challengeCount >= 1) {
			await badgeService.awardBadge(userId, BADGES.FIRST_CHALLENGE);
		}

		if (challengeCount >= 5) {
			await badgeService.awardBadge(userId, BADGES.FIVE_CHALLENGES);
		}
	},

	async checkLevelBadges(userId: string, level: number): Promise<void> {
		if (level >= 2) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_2);
		}

		if (level >= 5) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_5);
		}

		if (level >= 10) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_10);
		}

		if (level >= 15) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_15);
		}

		if (level >= 20) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_20);
		}

		if (level >= 25) {
			await badgeService.awardBadge(userId, BADGES.LEVEL_25);
		}
	},

	async checkLoginStreakBadges(userId: string): Promise<void> {
		const activeDays = await db
			.select({ date: table.userActiveDays.activeDate })
			.from(table.userActiveDays)
			.where(eq(table.userActiveDays.userId, userId))
			.orderBy(table.userActiveDays.activeDate);

		let currentStreak = 0;
		let maxStreak = 0;
		let previousDate: Date | null = null;

		for (const day of activeDays) {
			const currentDate = new Date(day.date);

			if (previousDate) {
				const diffTime = currentDate.getTime() - previousDate.getTime();
				const diffDays = diffTime / (1000 * 60 * 60 * 24);

				if (diffDays === 1) {
					currentStreak++;
				} else if (diffDays > 1) {
					currentStreak = 1;
				}
			} else {
				currentStreak = 1;
			}

			previousDate = currentDate;
			maxStreak = Math.max(maxStreak, currentStreak);
		}

		if (maxStreak >= 3) {
			await badgeService.awardBadge(userId, BADGES.FIRST_LOGIN_STREAK);
		}

		if (maxStreak >= 7) {
			await badgeService.awardBadge(userId, BADGES.WEEK_LOGIN_STREAK);
		}
	},

	/**
	 * Check all badge criteria for a user and award badges they've earned
	 * This is useful for retroactively awarding badges when new badges are introduced
	 * or when a user's progress needs to be re-evaluated
	 */
	async checkAllBadges(userId: string): Promise<{
		awarded: string[];
		alreadyHad: string[];
	}> {
		const [userData] = await db
			.select({
				id: table.user.id,
				level: table.user.level
			})
			.from(table.user)
			.where(eq(table.user.id, userId));

		if (!userData) {
			throw new Error(`User not found: ${userId}`);
		}

		const awarded = [];
		const alreadyHad = [];

		const levelBadges = [
			{ level: 2, badgeId: BADGES.LEVEL_2 },
			{ level: 5, badgeId: BADGES.LEVEL_5 },
			{ level: 10, badgeId: BADGES.LEVEL_10 },
			{ level: 15, badgeId: BADGES.LEVEL_15 },
			{ level: 20, badgeId: BADGES.LEVEL_20 },
			{ level: 25, badgeId: BADGES.LEVEL_25 }
		];

		for (const { level, badgeId } of levelBadges) {
			if (userData.level >= level) {
				const result = await badgeService.awardBadge(userId, badgeId);
				if (result?.isNew) {
					awarded.push(badgeId);
				} else if (result) {
					alreadyHad.push(badgeId);
				}
			}
		}

		const completedModulesResult = await db
			.select({ count: count() })
			.from(table.moduleProgress)
			.where(eq(table.moduleProgress.userId, userId));

		const completedCount = completedModulesResult[0]?.count || 0;

		const moduleBadges = [
			{ count: 1, badgeId: BADGES.FIRST_MODULE },
			{ count: 5, badgeId: BADGES.FIVE_MODULES },
			{ count: 10, badgeId: BADGES.TEN_MODULES }
		];

		for (const { count, badgeId } of moduleBadges) {
			if (completedCount >= count) {
				const result = await badgeService.awardBadge(userId, badgeId);
				if (result?.isNew) {
					awarded.push(badgeId);
				} else if (result) {
					alreadyHad.push(badgeId);
				}
			}
		}

		const completedChallengesResult = await db
			.select({ count: count() })
			.from(table.challengeProgress)
			.where(
				and(eq(table.challengeProgress.userId, userId), eq(table.challengeProgress.completed, true))
			);

		const challengeCount = completedChallengesResult[0]?.count || 0;

		const challengeBadges = [
			{ count: 1, badgeId: BADGES.FIRST_CHALLENGE },
			{ count: 5, badgeId: BADGES.FIVE_CHALLENGES }
		];

		for (const { count, badgeId } of challengeBadges) {
			if (challengeCount >= count) {
				const result = await badgeService.awardBadge(userId, badgeId);
				if (result?.isNew) {
					awarded.push(badgeId);
				} else if (result) {
					alreadyHad.push(badgeId);
				}
			}
		}

		await this.checkLoginStreakBadges(userId);

		return {
			awarded,
			alreadyHad
		};
	}
};
