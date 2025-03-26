import { modules } from '$services/modules';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const moduleList = modules.list();
	const modulesWithProgress = moduleList.map((mod) => ({
		...mod,
		progress: Math.round(Math.random() * 100)
	}));

	return {
		modules: modulesWithProgress
	};
}) satisfies PageServerLoad;
