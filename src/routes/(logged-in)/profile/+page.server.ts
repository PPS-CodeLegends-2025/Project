import { xpService } from '$lib/server/services/xp';
import { userService } from '$lib/server/services/user';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	const levelInfo = await xpService.getUserLevelInfo(user.id);

	const stats = await userService.getUserStats(user.id);

	const progress = await userService.getUserModuleProgress(user.id);

	const weekAgo = new Date();
	weekAgo.setDate(weekAgo.getDate() - 5);
	weekAgo.setHours(0, 0, 0, 0);
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + 1);
	currentDate.setHours(23, 59, 59, 999);

	const statistics = await userService.getStatisticsPerDayForUser(user.id, weekAgo, currentDate);

	return {
		levelInfo,
		user: {
			...user,
			stats
		},
		progress,
		statistics
	};
};
