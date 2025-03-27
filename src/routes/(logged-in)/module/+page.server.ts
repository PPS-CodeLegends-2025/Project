import { modules } from '$lib/services/modules';
import { modules as serverModules } from '$lib/server/services/modules';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const moduleList = modules.list();
	const userId = locals.user?.id || 'guest-user';

	const modulesWithData = await Promise.all(
		moduleList.map(async (mod) => {
			try {
				const modulePath = mod.url;
				const moduleData = serverModules.map()[modulePath];
				const progress = await serverModules.getModuleProgress(userId, modulePath);
				const completedSections = await serverModules.getCompletedSections(userId, modulePath);

				return {
					...mod,
					progress,
					lessonsCount: moduleData?.sections?.length || 0,
					completedSections
				};
			} catch (error) {
				console.error(`Error getting data for module ${mod.title}:`, error);
				return {
					...mod,
					progress: 0,
					lessonsCount: 0,
					completedSections: []
				};
			}
		})
	);

	return {
		modules: modulesWithData
	};
}) satisfies PageServerLoad;
