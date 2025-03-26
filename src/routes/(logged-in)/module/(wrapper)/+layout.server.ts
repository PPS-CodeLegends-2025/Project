import { modules, type SectionMeta } from '$services/modules';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

function extractModulePath(url: string) {
	const parts = url.split('/');
	return parts.slice(0, 3).join('/');
}

export const load = (async ({ url }) => {
	const path = extractModulePath(url.pathname);
	const moduleMeta = modules.map()[path];

	if (!moduleMeta) throw redirect(302, '/module');

	const currentSectionIndex = moduleMeta.sections.findIndex((x) => x.url === url.pathname);
	const currentSection: SectionMeta | undefined = moduleMeta.sections[currentSectionIndex];

	return {
		module: moduleMeta,
		section: {
			current: currentSection,
			index: currentSectionIndex
		},
		userProgress: {
			module: 0,
			sections: moduleMeta.sections.map(() => 0)
		}
	};
}) satisfies LayoutServerLoad;
