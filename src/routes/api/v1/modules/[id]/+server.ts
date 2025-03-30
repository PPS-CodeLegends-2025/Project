import { error, json } from '@sveltejs/kit';
import { modules } from '$lib/server/services/modules';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const { id } = params;
	const userId = locals.user?.id || 'guest-user';

	try {
		const modulePath = id.startsWith('/') ? id : `/module/${id}`;
		const moduleData = modules.map()[modulePath];

		if (!moduleData) {
			throw error(404, 'Module not found');
		}

		const progress = await modules.getModuleProgress(userId, modulePath);
		const completedSections = await modules.getCompletedSections(userId, modulePath);

		return json({
			...moduleData.data,
			progress,
			lessonsCount: moduleData.sections?.length || 0,
			completedSections
		});
	} catch (err) {
		console.error('Error fetching module:', err);
		throw error(500, 'Error fetching module data');
	}
};
