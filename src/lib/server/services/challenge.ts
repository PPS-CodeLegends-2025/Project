import { db } from '../db';
import { challenge, challengeProgress, challengeTask } from '../db/schema/challenge';
import { and, asc, count, eq } from 'drizzle-orm';
import { xpService } from './xp';
import type { GeneratedTaskTemplate } from './taskgen';
import { badgeAwards } from './badgeAwards';

export const challenges = {
	async getChallenge(challengeId: string) {
		const [challengeData] = await db.select().from(challenge).where(eq(challenge.id, challengeId));

		return challengeData || null;
	},

	async getChallengeCount() {
		const [cnt] = await db.select({ count: count(challenge.id) }).from(challenge);

		return cnt?.count || 0;
	},

	async getChallengeAndCompleted(challengeId: string, userId: string) {
		const [challengeData] = await db.select().from(challenge).where(eq(challenge.id, challengeId));
		if (!challengeData) return null;

		const [challengeProgressData] = await db
			.select()
			.from(challengeProgress)
			.where(
				and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
			);
		return {
			...challengeData,
			completed: !!challengeProgressData?.completed
		};
	},

	async getChallengeTaskForChallenge(challengeId: string) {
		const [challengeTaskData] = await db
			.select()
			.from(challengeTask)
			.where(eq(challengeTask.challengeId, challengeId));

		return challengeTaskData || null;
	},

	async getAllChallengesForUser(userId: string) {
		try {
			return await db.select().from(challenge).where(eq(challengeProgress.userId, userId));
		} catch (err) {
			console.error('Error getting challenges:', err);
			return [];
		}
	},

	async getCompletedChallengeIdsForUser(userId: string) {
		try {
			const progress = await db
				.select({ challengeId: challengeProgress.challengeId })
				.from(challengeProgress)
				.where(and(eq(challengeProgress.userId, userId), eq(challengeProgress.completed, true)));

			return progress.map((p) => p.challengeId);
		} catch (err) {
			console.error('Error getting completed challenge IDs:', err);
			return [];
		}
	},

	async getCompletedChallengesForUser(userId: string) {
		try {
			const progress = await db
				.select({ challengeId: challengeProgress.challengeId })
				.from(challengeProgress)
				.where(and(eq(challengeProgress.userId, userId), eq(challengeProgress.completed, true)));

			return progress;
		} catch (err) {
			console.error('Error getting completed challenges:', err);
			return [];
		}
	},

	//returns challenges with completed info
	async getChallengesForUser(userId: string) {
		try {
			const challenges = await db.select().from(challenge).orderBy(asc(challenge.title));

			const userProgress = await db
				.select({
					challengeId: challengeProgress.challengeId,
					completed: challengeProgress.completed
				})
				.from(challengeProgress)
				.where(eq(challengeProgress.userId, userId));

			const completedChallenges = new Set(
				userProgress
					.filter((progress) => progress.completed)
					.map((progress) => progress.challengeId)
			);

			return challenges.map((ch) => ({
				...ch,
				completed: completedChallenges.has(ch.id)
			}));
		} catch (error) {
			console.error('Error fetching challenges for user:', error);
			return [];
		}
	},

	async markChallengeCompleted(userId: string, challengeId: string): Promise<void> {
		try {
			const existing = await db
				.select()
				.from(challengeProgress)
				.where(
					and(
						eq(challengeProgress.userId, userId),
						eq(challengeProgress.challengeId, challengeId),
						eq(challengeProgress.completed, true)
					)
				);

			console.log('Existing challenge progress:', existing);

			if (existing.length === 0) {
				const challengeData = await this.getChallenge(challengeId);

				if (!challengeData) {
					console.warn('Challenge not found:', challengeId);
					return;
				}

				await db.insert(challengeProgress).values({
					userId,
					challengeId,
					completed: true,
					completedAt: new Date()
				});

				const xpReward = challengeData.xp;
				await xpService.awardXp(userId, xpReward);
				await badgeAwards.checkChallengeCompletionBadges(userId);
			}
		} catch (error) {
			console.error('Error marking challenge as completed:', error);
			throw error;
		}
	},

	async createChallenge(
		chal: {
			title: string;
			description: string;
			difficulty: string;
			category: string;
			xp: number;
			timeEstimate: string;
		},

		task: {
			name: string;
			description: string;
			inputs: GeneratedTaskTemplate['inputs'];
			output: GeneratedTaskTemplate['output'];
			tests: GeneratedTaskTemplate['tests'];
			exampleCode: string;
		}
	) {
		const [ch] = await db.insert(challenge).values(chal).$returningId();

		await db.insert(challengeTask).values({
			challengeId: ch.id,
			...task
		});
	}
};
