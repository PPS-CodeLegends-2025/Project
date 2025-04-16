import { executeGraphQLQuery } from '$lib/server/graphql';
import { userService } from '$lib/server/services/user';
import { xpService } from '$lib/server/services/xp';
import { badgeService } from '$lib/server/services/badge';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user!.id;

	// APPROACH 1: GraphQL - Used for complex, nested, and related data
	// -----------------------------------------------------------------
	const gqlResult = await executeGraphQLQuery(
		`
    query GetUserProfile($userId: ID!) {
      user(id: $userId) {
        username
        level
        xp
        stats {
          lessonsCompleted
          challengesSolved
          daysActive
        }
        badges {
          id
          name
          icon
          category
        }
      }
    }
  `,
		{ userId }
	);

	if (!gqlResult.data?.user) {
		console.error('GraphQL user data fetch failed:', gqlResult.errors);
	}

	// APPROACH 2: REST API - Used for simpler, specific data needs
	// -----------------------------------------------------------

	const recentBadges = await badgeService.getUnviewedBadges(userId);

	const levelInfo = await xpService.getUserLevelInfo(userId);

	const activityStats = await userService.getStatisticsPerDayForUser(
		userId,
		new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
		new Date()
	);

	const moduleProgress = await userService.getUserModuleProgress(userId);

	return {
		// GraphQL data
		profile: gqlResult.data?.user,

		// REST API data
		recentBadges,
		levelInfo,
		activityStats,

		progress: {
			...moduleProgress,
			completedModules: moduleProgress.completedModules || [],
			inProgressModules: moduleProgress.inProgressModules || []
		}
	};
};
