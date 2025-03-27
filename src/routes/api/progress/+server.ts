import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { modules } from '$lib/server/services/modules';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userId, moduleId, sectionIndex } = await request.json();

		if (!userId || !moduleId || sectionIndex === undefined) {
			return json({ success: false, message: 'Missing required fields' }, { status: 400 });
		}

		await modules.markSectionCompleted(userId, moduleId, sectionIndex);

		return json({ success: true });
	} catch (error) {
		console.error('Error updating progress:', error);
		return json({ success: false, message: 'Failed to update progress' }, { status: 500 });
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const userId = url.searchParams.get('userId');
		const moduleId = url.searchParams.get('moduleId');

		if (!userId || !moduleId) {
			return json({ success: false, message: 'Missing required parameters' }, { status: 400 });
		}

		const progress = await modules.getModuleProgress(userId, moduleId);
		const completedSections = await modules.getCompletedSections(userId, moduleId);

		return json({
			success: true,
			progress,
			completedSections
		});
	} catch (error) {
		console.error('Error fetching progress:', error);
		return json({ success: false, message: 'Failed to fetch progress' }, { status: 500 });
	}
};
