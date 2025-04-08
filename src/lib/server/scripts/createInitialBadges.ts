import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { logger } from '$server/logger';
import { eq } from 'drizzle-orm';

const initialBadges = [
	{
		id: 'first-module-complete',
		name: 'First Step',
		description: 'Complete your first module',
		icon: '🎓',
		category: 'progress',
		level: 1
	},
	{
		id: 'five-modules-complete',
		name: 'Knowledge Seeker',
		description: 'Complete 5 modules',
		icon: '📚',
		category: 'progress',
		level: 2
	},
	{
		id: 'ten-modules-complete',
		name: 'Master Student',
		description: 'Complete 10 modules',
		icon: '🏆',
		category: 'progress',
		level: 3
	},
	{
		id: 'first-challenge-complete',
		name: 'Challenge Accepted',
		description: 'Complete your first coding challenge',
		icon: '🧩',
		category: 'challenges',
		level: 1
	},
	{
		id: 'five-challenges-complete',
		name: 'Problem Solver',
		description: 'Complete 5 coding challenges',
		icon: '🔍',
		category: 'challenges',
		level: 2
	},
	{
		id: 'three-day-streak',
		name: 'Consistency',
		description: 'Log in for 3 consecutive days',
		icon: '🔥',
		category: 'engagement',
		level: 1
	},
	{
		id: 'week-streak',
		name: 'Dedicated Learner',
		description: 'Log in for 7 consecutive days',
		icon: '📅',
		category: 'engagement',
		level: 2
	},
	{
		id: 'apprentice',
		name: 'Apprentice',
		description: 'Reached level 2',
		icon: '/images/badges/Apprentice.png',
		category: 'achievements',
		level: 1
	},
	{
		id: 'journeyman',
		name: 'Journeyman',
		description: 'Reached level 5',
		icon: '/images/badges/Journeyman.png',
		category: 'achievements',
		level: 2
	},
	{
		id: 'artisan',
		name: 'Artisan',
		description: 'Reached level 10',
		icon: '/images/badges/Artisan.png',
		category: 'achievements',
		level: 3
	},
	{
		id: 'mastermind',
		name: 'Mastermind',
		description: 'Reached level 15',
		icon: '/images/badges/Mastermind.png',
		category: 'achievements',
		level: 4
	},
	{
		id: 'legend',
		name: 'Legend',
		description: 'Reached level 20',
		icon: '/images/badges/Legend.png',
		category: 'achievements',
		level: 5
	},
	{
		id: 'prestige',
		name: 'Prestige',
		description: 'Reached level 25',
		icon: '/images/badges/Prestige.png',
		category: 'achievements',
		level: 6
	}
];

export async function createInitialBadges() {
	logger.debug('Creating initial badges...');

	try {
		for (const badgeData of initialBadges) {
			const existingBadge = await db
				.select()
				.from(table.badge)
				.where(eq(table.badge.id, badgeData.id));

			if (existingBadge.length === 0) {
				await db.insert(table.badge).values(badgeData);
				logger.debug(`Created badge: ${badgeData.name}`);
			} else {
				logger.debug(`Badge already exists: ${badgeData.name}`);
			}
		}

		logger.debug('Badge creation completed!');
	} catch (error) {
		logger.error('Error creating badges:', error);
	}
}
