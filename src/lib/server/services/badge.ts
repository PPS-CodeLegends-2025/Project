import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { logger } from '$server/logger';
import { and, eq } from 'drizzle-orm';

export interface BadgeAwardResult {
	badge: table.Badge;
	isNew: boolean;
}

export const badgeService = {
	async getAllBadges(): Promise<table.Badge[]> {
		return db.select().from(table.badge).orderBy(table.badge.level);
	},

	async getBadgesByCategory(category: string): Promise<table.Badge[]> {
		return db
			.select()
			.from(table.badge)
			.where(eq(table.badge.category, category))
			.orderBy(table.badge.level);
	},

	async getUserBadges(userId: string): Promise<Array<table.Badge & { awardedAt: Date }>> {
		const results = await db
			.select({
				badge: table.badge,
				userBadge: {
					awardedAt: table.userBadge.awardedAt,
					viewed: table.userBadge.viewed
				}
			})
			.from(table.userBadge)
			.innerJoin(table.badge, eq(table.userBadge.badgeId, table.badge.id))
			.where(eq(table.userBadge.userId, userId))
			.orderBy(table.userBadge.awardedAt);

		return results.map((r) => ({
			...r.badge,
			awardedAt: r.userBadge.awardedAt,
			viewed: r.userBadge.viewed
		}));
	},

	async hasBadge(userId: string, badgeId: string): Promise<boolean> {
		const results = await db
			.select()
			.from(table.userBadge)
			.where(and(eq(table.userBadge.userId, userId), eq(table.userBadge.badgeId, badgeId)));

		return results.length > 0;
	},

	async awardBadge(userId: string, badgeId: string): Promise<BadgeAwardResult | null> {
		const [badgeResult] = await db.select().from(table.badge).where(eq(table.badge.id, badgeId));

		if (!badgeResult) return null;

		const hasBadge = await this.hasBadge(userId, badgeId);

		if (hasBadge) {
			return {
				badge: badgeResult,
				isNew: false
			};
		}

		await db.insert(table.userBadge).values({
			userId,
			badgeId,
			awardedAt: new Date(),
			viewed: false
		});

		return {
			badge: badgeResult,
			isNew: true
		};
	},

	async markBadgeAsViewed(userId: string, badgeId: string): Promise<void> {
		await db
			.update(table.userBadge)
			.set({ viewed: true })
			.where(and(eq(table.userBadge.userId, userId), eq(table.userBadge.badgeId, badgeId)));
	},

	async ensureBadgeUnviewed(userId: string, badgeId: string): Promise<void> {
		await db
			.update(table.userBadge)
			.set({ viewed: false })
			.where(and(eq(table.userBadge.userId, userId), eq(table.userBadge.badgeId, badgeId)));

		logger.debug(`Ensured badge ${badgeId} is unviewed for user ${userId}`);
	},

	async getUnviewedBadges(userId: string): Promise<Array<table.Badge & { awardedAt: Date }>> {
		const results = await db
			.select({
				badge: table.badge,
				userBadge: {
					awardedAt: table.userBadge.awardedAt,
					viewed: table.userBadge.viewed
				}
			})
			.from(table.userBadge)
			.innerJoin(table.badge, eq(table.userBadge.badgeId, table.badge.id))
			.where(and(eq(table.userBadge.userId, userId), eq(table.userBadge.viewed, false)));

		return results.map((r) => ({
			...r.badge,
			awardedAt: r.userBadge.awardedAt
		}));
	},

	async getBadgeById(badgeId: string): Promise<table.Badge[]> {
		return db.select().from(table.badge).where(eq(table.badge.id, badgeId));
	}
};
