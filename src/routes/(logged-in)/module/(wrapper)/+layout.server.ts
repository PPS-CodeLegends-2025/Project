import { modules } from '$lib/services/modules';
import { modules as serverModules } from '$lib/server/services/modules';
import type { SectionMeta } from '$lib/types/module';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

function extractModulePath(url: string) {
	const parts = url.split('/');
	return `/${parts.slice(1, 3).join('/')}`;
}

export const load: LayoutServerLoad = async ({ url, locals, parent }) => {
	const data = await parent();
	const path = extractModulePath(url.pathname);

	const modulesMap = modules.map();
	const moduleMeta = modulesMap[path as keyof typeof modulesMap];

	if (!moduleMeta) throw redirect(302, '/module');

	const moduleId = url.pathname.split('/')[2];
	// const currentSection = url.pathname.split('/')[3];

	/*
	if (!moduleId || !currentSection) {
		return {
			...data,
			module: moduleMeta,
			section: { index: -1, current: null },
			userProgress: { module: 0, sections: [] }
		};
	}
	*/

	const currentSectionIndex = moduleMeta.sections.findIndex((x) => {
		// Get the correct URL path from module sections
		const sectionPath = new URL(x.url, 'http://localhost').pathname;
		return sectionPath === url.pathname;
	});

	const currentSectionMeta: SectionMeta | undefined = moduleMeta.sections[currentSectionIndex];

	const userId = locals.user?.id || 'guest-user';

	// Get user progress for this module
	let moduleProgress = 0;
	let completedSectionIndices: number[] = [];

	try {
		moduleProgress = await serverModules.getModuleProgress(userId, path);
		completedSectionIndices = await serverModules.getCompletedSections(userId, path);
	} catch (error) {
		console.error('Error fetching module progress:', error);
	}

	// Create sections with completion status
	const sectionsWithStatus = moduleMeta.sections.map((section, index) => ({
		...section,
		completed: completedSectionIndices.includes(index)
	}));

	if (currentSectionIndex > 0 && !completedSectionIndices.includes(currentSectionIndex - 1)) {
		throw redirect(302, `/module/${moduleId}`);
	}

	const ret = {
		...data,
		module: {
			...moduleMeta,
			sections: sectionsWithStatus
		},
		section: {
			current: currentSectionMeta || null,
			index: currentSectionIndex !== -1 ? currentSectionIndex : 0
		},
		userProgress: {
			module: moduleProgress,
			sections: sectionsWithStatus.map((section) => (section.completed ? 100 : 0))
		}
	};

	return ret;
};
