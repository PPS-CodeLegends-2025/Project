import { json } from '@sveltejs/kit';
import { badgeService } from '$lib/server/services/badge';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const userId = url.searchParams.get('userId');
		const category = url.searchParams.get('category');

		if (!userId) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		let badges;
		if (category) {
			badges = await badgeService.getBadgesByCategory(category);
		} else {
			badges = await badgeService.getAllBadges();
		}

		const userBadges = await badgeService.getUserBadges(userId);
		const userBadgeIds = new Set(userBadges.map((b) => b.id));

		const result = badges.map((badge) => ({
			...badge,
			earned: userBadgeIds.has(badge.id),
			earnedAt: userBadges.find((b) => b.id === badge.id)?.awardedAt || null
		}));

		return json(result);
	} catch (error) {
		console.error('Error fetching badges:', error);
		return json({ error: 'Failed to fetch badges' }, { status: 500 });
	}
};
