import { json } from '@sveltejs/kit';
import { badgeAwards } from '$lib/server/services/badgeAwards';
import { badgeService } from '$lib/server/services/badge';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId } = await request.json();

		if (!userId) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		const result = await badgeAwards.checkAllBadges(userId);

		const awardedBadgesInfo = [];

		if (result.awarded.length > 0) {
			for (const badgeId of result.awarded) {
				const badges = await badgeService.getBadgeById(badgeId);
				if (badges.length > 0) {
					const now = new Date();
					awardedBadgesInfo.push({
						...badges[0],
						earned: true,
						earnedAt: now,
						awardedAt: now,
						viewed: false
					});
				}
			}
			console.log(`User ${userId} awarded ${result.awarded.length} new badges:`, result.awarded);

			for (const badgeId of result.awarded) {
				await badgeService.ensureBadgeUnviewed(userId, badgeId);
			}
		}

		return json({
			success: true,
			newlyAwarded: result.awarded.length,
			alreadyHad: result.alreadyHad.length,
			awardedBadges: awardedBadgesInfo
		});
	} catch (error) {
		console.error('Error checking badges:', error);
		return json({ error: 'Failed to check badges' }, { status: 500 });
	}
};
