import { challenges } from '$services/challenge';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const challenge = await challenges.getChallengeAndCompleted(params.id, locals.user!.id);

	if (!challenge) throw redirect(302, '/challenge');

	const task = await challenges.getChallengeTaskForChallenge(params.id);

	return {
		challenge: challenge,
		challengeTask: task
	};
}) satisfies PageServerLoad;
