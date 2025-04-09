import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { challenges } from '$lib/server/services/challenge';
import { generateTask } from '$lib/server/services/taskgen';

export const load = (async ({ locals }) => {
	if (!locals.user || !locals.user.admin) throw redirect(302, '/');

	return {};
}) satisfies PageServerLoad;

export const actions = {
	generateChallenge: async ({ request, locals }) => {
		// Ensure user is admin
		if (!locals.user || !locals.user.admin) {
			throw redirect(302, '/');
		}

		const formData = await request.formData();

		// Extract form values
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const difficulty = formData.get('difficulty') as string;
		const category = formData.get('category') as string;
		const xp = parseInt(formData.get('xp') as string, 10);
		const timeEstimate = formData.get('timeEstimate') as string;
		const prompt = formData.get('prompt') as string;

		// Basic validation
		if (
			!title ||
			!description ||
			!difficulty ||
			!category ||
			isNaN(xp) ||
			!timeEstimate ||
			!prompt
		) {
			return fail(400, { error: 'All fields are required' });
		}

		try {
			const generatedTask = await generateTask(prompt);

			return {
				generatedData: {
					challenge: {
						title,
						description,
						difficulty,
						category,
						xp,
						timeEstimate
					},
					task: generatedTask
				}
			};
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error generating challenge:', error);
				return fail(500, { error: error.message || 'Failed to generate challenge' });
			}
			console.error('Error generating challenge:', error);
			return fail(500, { error: 'Failed to generate challenge' });
		}
	},

	createChallenge: async ({ request, locals }) => {
		if (!locals.user || !locals.user.admin) throw redirect(302, '/');

		const formData = await request.formData();
		const confirm = formData.get('confirm');
		const serializedChallenge = formData.get('challenge') as string | null;

		if (confirm !== 'true' && serializedChallenge === null)
			return fail(400, { error: 'Confirmation required' });

		const deserialized = JSON.parse(serializedChallenge!);
		const challenge = deserialized.challenge;
		const task = deserialized.task;

		try {
			await challenges.createChallenge(challenge, task);

			return { success: true };
		} catch (error) {
			console.error('Error creating challenge:', error);
			return fail(500, { error: 'Failed to create challenge' });
		}
	}
} satisfies Actions;
