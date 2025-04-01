import m from '$modules';
import type { ModuleMeta, SectionMeta, Module, ModuleMap } from '$lib/types/module';
import { db } from '$lib/server/db';
import { moduleProgress } from '$lib/server/db/schema/moduleProgress';
import { and, eq } from 'drizzle-orm';
import { xpService } from './xp';
import * as table from '$lib/server/db/schema';
import { userService } from './user';

const moduleMap = m as ModuleMap;

const XP_REWARDS = {
	SECTION: 10,        // Basic module sections (lowest)
	QUIZ: 15,          // Quizzes (medium)
	PROGRAMMING: 30,   // Programming tasks (highest)
	MODULE_COMPLETION: 50  // Completing entire module
};

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

	async isSectionCompleted(
		userId: string,
		moduleId: string,
		sectionIndex: number
	): Promise<boolean> {
		try {
			const completed = await db
				.select()
				.from(moduleProgress)
				.where(
					and(
						eq(moduleProgress.userId, userId),
						eq(moduleProgress.moduleId, moduleId),
						eq(moduleProgress.sectionIndex, sectionIndex)
					)
				);

			return completed.length > 0;
		} catch (error) {
			console.error('Error checking section completion:', error);
			return false;
		}
	},

	determineContentType(moduleId: string, sectionIndex: number): 'PROGRAMMING' | 'QUIZ' | 'SECTION' {
		try {
			const modulePath = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
			const module = this.getModule(modulePath);
			
			if (!module?.sections || !module.sections[sectionIndex]) {
				return 'SECTION';
			}
			
			const sectionUrl = module.sections[sectionIndex].url || '';
			
			// Check for programming tasks and quizes (look for keywords in URL)
			// naive approach, maybe change later
			if (
				sectionUrl.includes('challenge') || 
				sectionUrl.includes('task') ||
				sectionUrl.includes('project') ||
				sectionUrl.includes('exercise') ||
				sectionUrl.includes('coding') ||
				sectionUrl.includes('personal-webpage')
			) {
				return 'PROGRAMMING';
			}
			
			if (
				sectionUrl.includes('quiz') || 
				sectionUrl.includes('test') ||
				sectionUrl.includes('assessment') ||
				sectionUrl.includes('exam')
			) {
				return 'QUIZ';
			}
			
			return 'SECTION';
		} catch (error) {
			console.error('Error determining content type:', error);
			return 'SECTION'; 
		}
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

			if (existing.length === 0) {
				await db.insert(moduleProgress).values({
					userId,
					moduleId,
					sectionIndex,
					completedAt: new Date()
				});

				const contentType = this.determineContentType(moduleId, sectionIndex);
				const xpToAward = XP_REWARDS[contentType];
				
				console.log(`Awarding ${xpToAward} XP for ${contentType} completion`);
				await xpService.awardXp(userId, xpToAward);

				const modulePath = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
				const moduleData = this.getModule(modulePath);
				const totalSections = moduleData?.sections?.length || 0;
				
				const completedSections = await this.getCompletedSections(userId, moduleId);
				
				if (totalSections > 0 && completedSections.length + 1 >= totalSections) {
					await xpService.awardXp(userId, XP_REWARDS.MODULE_COMPLETION);
					await userService.incrementLessonCompletion(userId);
				}
			}
		} catch (error) {
			console.error('Error marking section as completed:', error);
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
			console.error('Error getting module progress:', error);
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
			console.error('Error getting completed sections:', error);
			return [];
		}
	}
};

export type { ModuleMeta, SectionMeta, Module, ModuleMap };
