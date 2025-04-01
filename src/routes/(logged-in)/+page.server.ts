import { redirect } from '@sveltejs/kit';
import { modules } from '$lib/server/services/modules';
import { xpService } from '$lib/server/services/xp';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user) {
    throw redirect(302, '/login');
  }
  
    const levelInfo = await xpService.getUserLevelInfo(user.id);
  
  const modulesList = modules.list();
  
  const modulesWithProgress = await Promise.all(
    modulesList.map(async (mod) => {
      const modulePath = mod.url;
      const moduleData = modules.map()[modulePath];
      const progress = await modules.getModuleProgress(user.id, modulePath);
      const completedSections = await modules.getCompletedSections(user.id, modulePath);
      
      return {
        ...mod,
        progress,
        completedSections,
        totalSections: moduleData?.sections?.length || 0,
        completed: progress === 100,
        inProgress: progress > 0 && progress < 100
      };
    })
  );
  
  const completedModules = modulesWithProgress.filter(m => m.completed);
  const inProgressModules = modulesWithProgress.filter(m => m.inProgress);
  
  return {
    user,
    levelInfo,
    modules: {
      all: modulesWithProgress,
      completed: completedModules,
      inProgress: inProgressModules
    }
  };
};
