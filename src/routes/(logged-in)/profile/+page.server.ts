import { xpService } from '$lib/server/services/xp';
import { userService } from '$lib/server/services/user';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();
  
  const levelInfo = await xpService.getUserLevelInfo(user.id);
  
  const stats = await userService.getUserStats(user.id);
  
  return {
    levelInfo,
    user: {
      ...user,
      stats
    }
  };
};
