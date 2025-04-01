import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { xpService } from '$lib/server/services/xp';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { userId, amount, source } = await request.json();

    if (!userId || !amount) {
      return json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const result = await xpService.awardXp(userId, amount);

    console.log(`XP awarded: ${amount} to user ${userId} from ${source || 'unknown source'}`);

    return json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error awarding XP:', error);
    return json({ success: false, message: 'Failed to award XP' }, { status: 500 });
  }
};

export const GET: RequestHandler = async ({ url }) => {
  try {
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return json({ success: false, message: 'Missing userId parameter' }, { status: 400 });
    }

    const levelInfo = await xpService.getUserLevelInfo(userId);

    return json({
      success: true,
      ...levelInfo
    });
  } catch (error) {
    console.error('Error fetching level info:', error);
    return json({ success: false, message: 'Failed to fetch level information' }, { status: 500 });
  }
};
