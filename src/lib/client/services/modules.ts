import type { ModuleMeta, SectionMeta, Section, Module, ModuleMap } from '$lib/types/module';
import { apiClient } from '$client/fetch';

export const modules = {
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
