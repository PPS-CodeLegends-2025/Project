import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { userService } from './user';

export const xpService = {
  /**
   * The formula to calculate XP needed for a specific level
   * Progressive scaling: XP_required_for_level_n = 50 × n × 1.15^(n-1)
   * Rounded to nearest 10 for clarity
   */
  getXpForLevel(level: number): number {
    if (level <= 1) return 0;
    
    const xpRequired = 50 * level * Math.pow(1.15, level - 1);
    return Math.round(xpRequired / 10) * 10;
  },

  getTotalXpForLevel(level: number): number {
    if (level <= 1) return 0;
    
    let totalXp = 0;
    for (let i = 1; i < level; i++) {
      totalXp += this.getXpForLevel(i + 1);
    }
    return totalXp;
  },

  calculateLevelFromXp(totalXp: number): number {
    let level = 1;
    
    while (totalXp >= this.getXpForLevel(level + 1)) {
      totalXp -= this.getXpForLevel(level + 1);
      level++;
    }
    
    return level;
  },

  getXpNeededForNextLevel(currentLevel: number, currentXp: number): number {
    const nextLevelThreshold = this.getXpForLevel(currentLevel + 1);
    return nextLevelThreshold - currentXp;
  },

  async awardXp(userId: string, amount: number) {
    const [user] = await db
      .select({
        id: table.user.id,
        level: table.user.level,
        xp: table.user.xp
      })
      .from(table.user)
      .where(eq(table.user.id, userId));

    if (!user) throw new Error(`User not found: ${userId}`);

    let newLevel = user.level;
    let newXp = user.xp + amount;
    let leveledUp = false;
    
    while (newXp >= this.getXpForLevel(newLevel + 1)) {
      newXp -= this.getXpForLevel(newLevel + 1);
      newLevel++;
      leveledUp = true;
    }

    await db
      .update(table.user)
      .set({
        xp: newXp,
        level: newLevel
      })
      .where(eq(table.user.id, userId));

    await userService.recordUserActivity(userId);

    const [updatedUser] = await db
      .select({
        id: table.user.id,
        username: table.user.username,
        fullName: table.user.fullName,
        level: table.user.level,
        xp: table.user.xp
      })
      .from(table.user)
      .where(eq(table.user.id, userId));

    return {
      user: updatedUser,
      leveledUp,
      previousLevel: user.level,
      newLevel,
      xpGained: amount,
      newXp
    };
  },

  async getUserLevelInfo(userId: string) {
    const [user] = await db
      .select({
        id: table.user.id,
        username: table.user.username,
        level: table.user.level,
        xp: table.user.xp
      })
      .from(table.user)
      .where(eq(table.user.id, userId));

    if (!user) throw new Error(`User not found: ${userId}`);

    const xpForNextLevel = this.getXpForLevel(user.level + 1);
    const progressToNextLevel = user.xp / xpForNextLevel;

    return {
      userId: user.id,
      username: user.username,
      level: user.level,
      currentXp: user.xp,
      nextLevelXp: xpForNextLevel,
      progressToNextLevel: Math.min(1, Math.max(0, progressToNextLevel || 0)),
      xpToNextLevel: xpForNextLevel - user.xp
    };
  }
};
