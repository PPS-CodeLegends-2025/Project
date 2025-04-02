import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { xpService } from '$lib/server/services/xp';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, challengeId, xpReward } = await request.json();

		if (!userId || !challengeId) {
			return json({ success: false, message: 'Missing required fields' }, { status: 400 });
		}

		// TODO: update the challenge completion status in db
		// For now just award the XP
		const xpAmount = xpReward || 25; // Default XP amount

		const result = await xpService.awardXp(userId, xpAmount);

		return json({
			success: true,
			challengeCompleted: true,
			...result
		});
	} catch (error) {
		console.error('Error completing challenge:', error);
		return json({ success: false, message: 'Failed to complete challenge' }, { status: 500 });
	}
};
