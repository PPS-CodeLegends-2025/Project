import { apiClient } from '$client/fetch';

export interface LevelInfo {
  userId: string;
  username: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  progressToNextLevel: number;
  xpToNextLevel: number;
}

export interface XpAwardResult {
  user: {
    id: string;
    username: string;
    fullName?: string;
    level: number;
    xp: number;
  };
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
  xpGained: number;
  newXp: number;
}

export const xpService = {
  async awardXp(userId: string, amount: number, source?: string): Promise<XpAwardResult> {
    try {
      const response = await apiClient.post('/v1/xp', {
        userId,
        amount,
        source
      });
      
      if (!response.ok) {
        throw new Error('Failed to award XP');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error awarding XP:', error);
      throw error;
    }
  },
  
  async getLevelInfo(userId: string): Promise<LevelInfo> {
    try {
      const response = await apiClient.get(`/v1/xp?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch level information');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching level info:', error);
      throw error;
    }
  }
};
