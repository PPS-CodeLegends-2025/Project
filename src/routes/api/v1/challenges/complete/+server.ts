import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { challenges } from '$services/challenge';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const { challengeId } = await request.json();
		const userId = locals.user!.id;

		if (!userId || !challengeId)
			return json({ success: false, message: 'Missing required fields' }, { status: 400 });

		const challenge = await challenges.getChallenge(challengeId);

		if (!challenge)
			return json({ success: false, message: 'Challenge not found' }, { status: 404 });

		await challenges.markChallengeCompleted(userId, challengeId);

		return json({
			success: true,
			challengeCompleted: true
		});
	} catch (error) {
		console.error('Error completing challenge:', error);
		return json({ success: false, message: 'Failed to complete challenge' }, { status: 500 });
	}
};
