import m from '$modules';
import type { ModuleMeta, SectionMeta, Module, ModuleMap } from '$lib/types/module';
import { db } from '$lib/server/db';
import { moduleProgress } from '$lib/server/db/schema/moduleProgress';
import { and, eq } from 'drizzle-orm';
import { xpService } from './xp';
import { userService } from './user';
import { badgeAwards } from './badgeAwards';
import { logger } from '$server/logger';

const moduleMap = m as ModuleMap;

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
	},
	getModule(path: string) {
		return moduleMap[path];
	},

	async markSectionCompleted(
		userId: string,
		moduleId: string,
		sectionIndex: number
	): Promise<void> {
		try {
			const existing = await db
				.select()
				.from(moduleProgress)
				.where(
					and(
						eq(moduleProgress.userId, userId),
						eq(moduleProgress.moduleId, moduleId),
						eq(moduleProgress.sectionIndex, sectionIndex)
					)
				);

			const modulePath = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
			const moduleData = this.getModule(modulePath);

			if (existing.length === 0 && moduleData) {
				await db.insert(moduleProgress).values({
					userId,
					moduleId,
					sectionIndex,
					completedAt: new Date()
				});

				const totalSections = moduleData.sections.length;
				const completedSections = await this.getCompletedSections(userId, moduleId);

				if (totalSections > 0 && completedSections.length >= totalSections) {
					const moduleXp = moduleData.data.xpReward;
					await xpService.awardXp(userId, moduleXp);
					await userService.incrementLessonCompletion(userId);

					await badgeAwards.checkModuleCompletionBadges(userId);
				}
			}
		} catch (error) {
			logger.error('Error marking section as completed:', error);
			throw error;
		}
	},

	async getModuleProgress(userId: string, moduleId: string): Promise<number> {
		try {
			const allCompletedSections = await db
				.select()
				.from(moduleProgress)
				.where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));

			const modulePath = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
			const moduleData = this.getModule(modulePath);
			const totalSections = moduleData?.sections?.length || 0;

			return totalSections > 0
				? Math.round((allCompletedSections.length / totalSections) * 100)
				: 0;
		} catch (error) {
			logger.error('Error getting module progress:', error);
			return 0;
		}
	},

	async getCompletedSections(userId: string, moduleId: string): Promise<number[]> {
		try {
			const completedSections = await db
				.select({ sectionIndex: moduleProgress.sectionIndex })
				.from(moduleProgress)
				.where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));

			return completedSections.map((section) => section.sectionIndex);
		} catch (error) {
			logger.error('Error getting completed sections:', error);
			return [];
		}
	}
};

export type { ModuleMeta, SectionMeta, Module, ModuleMap };
