import type { Snippet } from 'svelte';

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

export type Module = ModuleMeta & {
	progress: number;
	lessons: number;
	sections: (SectionMeta & { completed: boolean })[];
	content: Snippet;
};

export type ModuleMap = Record<string, { data: ModuleMeta; sections: SectionMeta[] }>;
