import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { badgeService } from '$lib/server/services/badge';

export const GET: RequestHandler = async ({ url, locals }) => {
	try {
		const userId = url.searchParams.get('userId') || locals.user?.id;

		if (!userId) {
			return json({ success: false, message: 'User ID is required' }, { status: 400 });
		}

		const userBadges = await badgeService.getUserBadges(userId);

		const unviewedBadges = await badgeService.getUnviewedBadges(userId);

		for (const badge of unviewedBadges) {
			await badgeService.markBadgeAsViewed(userId, badge.id);
		}

		return json({
			success: true,
			badges: userBadges,
			unviewedBadges: unviewedBadges.length
		});
	} catch (error) {
		console.error('Error fetching user badges:', error);
		return json({ success: false, message: 'Failed to fetch badges' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, badgeId } = await request.json();

		if (!userId || !badgeId) {
			return json({ error: 'User ID and Badge ID are required' }, { status: 400 });
		}

		await badgeService.markBadgeAsViewed(userId, badgeId);
		return json({ success: true });
	} catch (error) {
		console.error('Error marking badge as viewed:', error);
		return json({ error: 'Failed to update badge status' }, { status: 500 });
	}
};
