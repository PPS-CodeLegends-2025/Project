import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { count, desc, eq } from 'drizzle-orm';

export const load = (async ({ locals }) => {
	const user = locals.user;
	if (!user || !user.admin) {
		throw redirect(302, '/');
	}

	// Get all challenges
	const challenges = await db
		.select({
			id: table.challenge.id,
			title: table.challenge.title,
			description: table.challenge.description,
			difficulty: table.challenge.difficulty,
			category: table.challenge.category,
			xp: table.challenge.xp,
			timeEstimate: table.challenge.timeEstimate
		})
		.from(table.challenge)
		.orderBy(desc(table.challenge.id));

	// Get completion counts for each challenge
	const completionCounts = await db
		.select({
			challengeId: table.challengeProgress.challengeId,
			count: count()
		})
		.from(table.challengeProgress)
		.where(eq(table.challengeProgress.completed, true))
		.groupBy(table.challengeProgress.challengeId);

	// Create a map of challenge IDs to completion counts
	const completionMap = completionCounts.reduce(
		(acc, curr) => {
			acc[curr.challengeId] = curr.count;
			return acc;
		},
		{} as Record<string, number>
	);

	// Add completion counts to challenges
	const challengesWithCompletions = challenges.map((challenge) => ({
		...challenge,
		completions: completionMap[challenge.id] || 0
	}));

	return {
		challenges: challengesWithCompletions
	};
}) satisfies PageServerLoad;
