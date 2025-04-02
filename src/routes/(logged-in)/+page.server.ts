import { redirect } from '@sveltejs/kit';
import { xpService } from '$lib/server/services/xp';
import type { PageServerLoad } from './$types';
import { userService } from '$services/user';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) throw redirect(302, '/login');

	const levelInfo = await xpService.getUserLevelInfo(user.id);
	const modulesWithProgress = await userService.getUserModuleProgress(user.id);

	return {
		user,
		levelInfo,
		modules: {
			all: modulesWithProgress.modules,
			completed: modulesWithProgress.completedModules,
			inProgress: modulesWithProgress.inProgressModules
		}
	};
};
