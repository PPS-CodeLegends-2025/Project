import m from '$modules';

export type ModuleMeta = {
	image: string;
	level: string;
	xpReward: number;
	category: string;
	title: string;
	description: string;
	url: string;
};

export type SectionMeta = {
	title: string;
	url: string;
};

export type Section = Omit<SectionMeta, 'url'>;

const moduleMap = m as Record<string, { data: ModuleMeta; sections: SectionMeta[] }>;

export const modules = {
	map() {
		return moduleMap;
	},
	list() {
		return Object.keys(moduleMap).map((x) => moduleMap[x].data);
	},
	navMap() {
		return Object.keys(moduleMap).map((x) => ({
			title: moduleMap[x].data.title,
			url: moduleMap[x].data.url
		}));
	}
};

export type ModuleMap = ReturnType<typeof modules.map>;
