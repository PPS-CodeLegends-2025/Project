import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { badgeService } from '$lib/server/services/badge';
import { userService } from '$lib/server/services/user';
import { modules } from '$lib/server/services/modules';
import { challenges } from '$services/challenge';

interface Context {
	user?: {
		id: string;
	};
}

interface SearchResultType {
	__typename?: string;
	difficulty?: number;
	xpReward?: number;
	icon?: string;
	[key: string]: unknown;
}

export const resolvers = {
	Query: {
		user: async (_: unknown, { id }: { id: string }) => {
			const [user] = await db
				.select({
					id: table.user.id,
					username: table.user.username,
					fullName: table.user.fullName,
					level: table.user.level,
					xp: table.user.xp,
					registrationDate: table.user.registrationDate,
					admin: table.user.admin
				})
				.from(table.user)
				.where(eq(table.user.id, id));

			return user;
		},
		users: async () => {
			return db
				.select({
					id: table.user.id,
					username: table.user.username,
					fullName: table.user.fullName,
					level: table.user.level,
					xp: table.user.xp,
					registrationDate: table.user.registrationDate,
					admin: table.user.admin
				})
				.from(table.user)
				.orderBy(desc(table.user.level));
		},
		modules: (_: unknown, { category }: { category?: string }) => {
			const allModules = modules.list();

			if (!category) {
				return allModules;
			}

			return allModules.filter(
				(module) => module.category.toLowerCase() === category.toLowerCase()
			);
		},
		module: (_: unknown, { url }: { url: string }) => {
			const modulePath = url.startsWith('/') ? url : `/${url}`;
			const moduleData = modules.getModule(modulePath);
			return moduleData?.data;
		},
		badges: async (_: unknown, { category }: { category?: string }) => {
			if (category) {
				return badgeService.getBadgesByCategory(category);
			}
			return badgeService.getAllBadges();
		},
		userBadges: async (_: unknown, { userId }: { userId: string }) => {
			return badgeService.getUserBadges(userId);
		},
		leaderboard: async (_: unknown, { limit = 10 }: { limit?: number }) => {
			return db
				.select({
					id: table.user.id,
					username: table.user.username,
					level: table.user.level,
					xp: table.user.xp,
					registrationDate: table.user.registrationDate
				})
				.from(table.user)
				.orderBy(desc(table.user.level), desc(table.user.xp))
				.limit(limit);
		},
		challenge: async (_: unknown, { id }: { id?: string }) => {
			if (id) {
				return await challenges.getChallenge(id);
			}
			return null;
		},
		challenges: async (_: unknown, __: unknown, context: Context) => {
			const userId = context.user?.id || 'guest-user';
			return await challenges.getChallengesForUser(userId);
		},
		search: async (_: unknown, { query, types }: { query: string; types?: string[] }) => {
			const results = [];

			const searchQuery = query.toLowerCase();

			const searchTypes = types || ['Module', 'Challenge', 'Badge'];

			if (searchTypes.includes('Module')) {
				const allModules = modules.list();
				const matchedModules = allModules.filter(
					(module) =>
						module.title.toLowerCase().includes(searchQuery) ||
						module.description.toLowerCase().includes(searchQuery)
				);

				results.push(
					...matchedModules.map((module) => ({
						...module,
						__typename: 'Module',
						id: module.url
					}))
				);
			}

			if (searchTypes.includes('Challenge')) {
				const allChallenges = await challenges.getChallengesForUser('guest-user');
				const matchedChallenges = allChallenges.filter(
					(challenge) =>
						challenge.title.toLowerCase().includes(searchQuery) ||
						(challenge.description && challenge.description.toLowerCase().includes(searchQuery))
				);

				results.push(
					...matchedChallenges.map((challenge) => ({
						...challenge,
						__typename: 'Challenge'
					}))
				);
			}

			if (searchTypes.includes('Badge')) {
				const allBadges = await badgeService.getAllBadges();
				const matchedBadges = allBadges.filter(
					(badge) =>
						badge.name.toLowerCase().includes(searchQuery) ||
						(badge.description && badge.description.toLowerCase().includes(searchQuery))
				);

				results.push(
					...matchedBadges.map((badge) => ({
						...badge,
						__typename: 'Badge'
					}))
				);
			}

			return results;
		}
	},

	User: {
		badges: async (parent: { id: string }) => {
			return badgeService.getUserBadges(parent.id);
		},
		modules: async (parent: { id: string }) => {
			const moduleList = modules.list();
			const result = await Promise.all(
				moduleList.map(async (mod) => {
					const modulePath = mod.url;
					const moduleData = modules.map()[modulePath];
					const progress = await modules.getModuleProgress(parent.id, modulePath);
					const completedSections = await modules.getCompletedSections(parent.id, modulePath);

					return {
						module: mod,
						progress,
						completedSections,
						totalSections: moduleData?.sections?.length || 0
					};
				})
			);
			return result;
		},
		stats: async (parent: { id: string }) => {
			return userService.getUserStats(parent.id);
		},
		score: (parent: { level: number; xp: number }) => {
			const xpWeight = Math.max(0.05, 1 - (parent.level - 1) / 20);
			const finalXp = Math.min(parent.xp * xpWeight, 950);
			return parent.level * 1000 + Math.round(finalXp);
		},
		rank: async (parent: { id: string; level: number; xp: number }) => {
			const allUsers = await db
				.select({
					id: table.user.id,
					level: table.user.level,
					xp: table.user.xp
				})
				.from(table.user);

			const usersWithScores = allUsers.map((user) => {
				const xpWeight = Math.max(0.05, 1 - (user.level - 1) / 20);
				const finalXp = Math.min(user.xp * xpWeight, 950);
				const score = user.level * 1000 + Math.round(finalXp);

				return {
					id: user.id,
					score
				};
			});

			usersWithScores.sort((a, b) => b.score - a.score);

			const userRankIndex = usersWithScores.findIndex((u) => u.id === parent.id);

			return userRankIndex !== -1 ? userRankIndex + 1 : null;
		}
	},

	SearchResult: {
		__resolveType(obj: SearchResultType) {
			if (obj.__typename) return obj.__typename;

			if (obj.difficulty) return 'Challenge';
			if (obj.xpReward) return 'Module';
			if (obj.icon) return 'Badge';

			return null;
		}
	}
};
