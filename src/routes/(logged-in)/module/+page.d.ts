import type { ModuleMeta, SectionMeta } from '$lib/types/module';

interface ExtendedModuleMeta extends ModuleMeta {
	progress: number;
	lessonsCount: number;
}

export interface PageData {
	user: {
		id: string;
		username: string;
		fullName: string;
		level: number;
		xp: number;
		registrationDate: Date;
	};
	session?: {
		id: string;
		userId: string;
		expiresAt: Date;
	};
	module?: {
		data: ModuleMeta;
		sections: (SectionMeta & { completed?: boolean })[];
	};
	section?: {
		current: (SectionMeta & { completed?: boolean }) | null;
		index: number;
	};
	userProgress?: {
		module: number;
		sections: number[];
	};
	modules: ExtendedModuleMeta[];
}
