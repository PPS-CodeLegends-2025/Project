import type { PageServerLoad } from './$types';
import { challenges } from '$services/challenge';

export const load = (async ({ locals }) => {
	const userId = locals.user?.id || 'guest-user';
	const challengeList = await challenges.getChallengesForUser(userId);
	return {
		challenges: challengeList
	};
}) satisfies PageServerLoad;
