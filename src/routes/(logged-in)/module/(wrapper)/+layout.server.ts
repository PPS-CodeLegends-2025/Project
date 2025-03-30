import { modules as serverModules } from '$lib/server/services/modules';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

function extractModulePath(url: string) {
	const parts = url.split('/');
	return `/${parts.slice(1, 3).join('/')}`;
}

function extractSectionPath(url: string) {
	const parts = url.split('/');
	return `/${parts.slice(1, 4).join('/')}`;
}

export const load: LayoutServerLoad = async ({ url, parent }) => {
	const data = await parent();
	const modulePath = extractModulePath(url.pathname);

	const modulesMap = serverModules.map();
	const moduleMeta = modulesMap[modulePath as keyof typeof modulesMap];

	if (!moduleMeta) throw redirect(302, '/module');

	const sectionPath = extractSectionPath(url.pathname);

	const currentSectionIndex = moduleMeta.sections.findIndex(
		(section) => section.url === sectionPath
	);

	const currentSectionMeta = moduleMeta.sections[currentSectionIndex];

	if (sectionPath !== modulePath && currentSectionIndex === -1) throw redirect(302, modulePath);

	const userId = data.user.id;

	let moduleProgress = 0;
	let completedSectionIndices: number[] = [];

	try {
		moduleProgress = await serverModules.getModuleProgress(userId, modulePath);
		completedSectionIndices = await serverModules.getCompletedSections(userId, modulePath);
	} catch (error) {
		console.error('Error fetching module progress:', error);
	}

	const sectionsWithStatus = moduleMeta.sections.map((section, index) => ({
		...section,
		completed: completedSectionIndices.includes(index)
	}));

	if (currentSectionIndex > 0 && !completedSectionIndices.includes(currentSectionIndex - 1))
		throw redirect(302, modulePath);

	return {
		...data,
		module: {
			...moduleMeta,
			sections: sectionsWithStatus
		},
		section: {
			index: currentSectionIndex,
			meta: currentSectionMeta,
			completed: sectionsWithStatus[currentSectionIndex]?.completed ?? false
		},
		userProgress: {
			module: moduleProgress,
			sections: sectionsWithStatus
		}
	};
};
