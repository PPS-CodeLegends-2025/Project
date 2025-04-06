import { challenges } from '$services/challenge';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const thisChallenge = await challenges.getChallenge(params.challenge_id);
	return {
		challenge: thisChallenge
	};
}) satisfies PageServerLoad;
