import { json } from '@sveltejs/kit';
import { modules } from '$lib/server/services/modules';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
  try {
    const moduleId = params.id;
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const modulePath = moduleId.startsWith('/') ? moduleId : `/${moduleId}`;
    const moduleData = modules.getModule(modulePath);
    
    if (!moduleData) {
      return json({ error: 'Module not found' }, { status: 404 });
    }
    
    const progress = await modules.getModuleProgress(userId, modulePath);
    const completedSections = await modules.getCompletedSections(userId, modulePath);
    
    return json({
      module: moduleData.data,
      progress,
      completedSections,
      totalSections: moduleData.sections.length
    });
  } catch (error) {
    console.error('Error fetching module data:', error);
    return json({ error: 'Failed to fetch module data' }, { status: 500 });
  }
};
