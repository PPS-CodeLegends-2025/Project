import { json } from '@sveltejs/kit';
import { modules } from '$lib/server/services/modules';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const moduleList = modules.list();
    const moduleProgress = await Promise.all(
      moduleList.map(async (mod) => {
        const modulePath = mod.url;
        const moduleData = modules.map()[modulePath];
        const progress = await modules.getModuleProgress(userId, modulePath);
        const completedSections = await modules.getCompletedSections(userId, modulePath);
        
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
    
    return json({
      modules: moduleProgress,
      completedModules: moduleProgress.filter(m => m.completed),
      inProgressModules: moduleProgress.filter(m => m.inProgress)
    });
  } catch (error) {
    console.error('Error fetching user module progress:', error);
    return json({ error: 'Failed to fetch user module progress' }, { status: 500 });
  }
};
