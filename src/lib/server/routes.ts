import { writeFileSync } from 'fs';
import { readModuleData, readModuleSectionData } from './routePageParser';
import { dev } from '$app/environment';

const pages = import.meta.glob('/src/routes/**/+page.svelte');
export const routes = Object.keys(pages)
	.map((x) => x.substring(11)) // /src/routes
	.map((x) => x.substring(0, x.length - 13)) // /+page.svelte
	.map((x) => x.replaceAll(/\/\([\w|-]+\)/g, '')) // (groups)
	.filter((x) => !x.includes('[')) // parametrized
	.map((x) => (x.length > 0 ? x : '/'))
	.sort();

const modules = routes.filter((x) => x.includes('/module') && x.split('/').length === 3);
const moduleSections = routes.filter((x) => x.includes('/module') && x.split('/').length > 3);

export const groupedModules = moduleSections
	.filter((x) => x.split('/').length > 3)
	.reduce(
		(acc, x) => {
			const parts = x.split('/');
			const parent = parts.slice(2, -1).join('/');
			const module = parts.slice(-1)[0];
			if (!acc[parent]) acc[parent] = [];
			acc[parent].push(module);
			return acc;
		},
		{} as Record<string, string[]>
	);

if (dev) {
	const data = {} as Record<
		string,
		{
			data: ReturnType<typeof readModuleData>;
			sections: ReturnType<typeof readModuleSectionData>[];
		}
	>;

	for (const module of modules) {
		console.log(`Reading ${module}`);
		data[module] = {
			data: readModuleData(module),
			sections: moduleSections.filter((x) => x.startsWith(module)).map(readModuleSectionData)
		};
	}

	writeFileSync('module-map.json', JSON.stringify(data, null, 2));
}
