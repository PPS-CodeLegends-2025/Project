import type { ModuleMeta, SectionMeta, Section, Module, ModuleMap } from '$lib/types/module';
import { apiClient } from '$client/fetch';

export const modules = {
	// fetch module metadata from server (built via the route parser)
	async fetchModules(): Promise<{
		map: ModuleMap;
		list: ModuleMeta[];
		navMap: { title: string; url: string }[];
	}> {
		const response = await apiClient.get('/v1/modules');
		if (!response.ok) throw new Error('Failed to fetch modules');
		return response.json();
	},

	// Mark a section as completed
	async markSectionCompleted(
		userId: string,
		moduleId: string,
		sectionIndex: number
	): Promise<boolean> {
		try {
			const normalizedModuleId = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
			const response = await apiClient.post('/v1/progress', {
				userId,
				moduleId: normalizedModuleId,
				sectionIndex
			});
			if (!response.ok) throw new Error('Failed to mark section as completed');
			return true;
		} catch (error) {
			console.error('Failed to mark section as completed:', error);
			throw error;
		}
	}
};

export type { ModuleMap, Module, ModuleMeta, SectionMeta, Section };
