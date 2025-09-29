import prisma from './prisma';

// XP values for different activities
export const XP_VALUES = {
  quiz: 50,
  lab: 100,
  'deep-dive': 25,
  cheatsheet: 15,
  library: 10,
  track_module: 5
} as const;

// Level thresholds (every 500 XP = 1 level)
export const XP_PER_LEVEL = 500;

// Calculate level from XP
export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

// Calculate XP needed for next level
export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = currentLevel * XP_PER_LEVEL;
  return nextLevelXP - currentXP;
}

// Calculate XP progress to next level (0-100)
export function getXPProgress(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const levelStartXP = (currentLevel - 1) * XP_PER_LEVEL;
  const levelEndXP = currentLevel * XP_PER_LEVEL;
  const progress = ((currentXP - levelStartXP) / (levelEndXP - levelStartXP)) * 100;
  return Math.round(progress);
}

// Check if user should get streak bonus
export async function updateStreak(userId: string): Promise<{ streak: number; streakBonus: boolean }> {
  const user = await prisma.userProfile.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let streak = user.streak || 0;
  let streakBonus = false;

  if (user.lastActive) {
    const lastActiveDate = new Date(user.lastActive);
    const lastActiveDay = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate());
    
    const daysDiff = Math.floor((today.getTime() - lastActiveDay.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day - increment streak
      streak += 1;
      streakBonus = true;
    } else if (daysDiff > 1) {
      // Gap in days - reset streak
      streak = 1;
    }
    // daysDiff === 0 means same day, no change to streak
  } else {
    // First activity
    streak = 1;
  }

  // Update user with new streak and lastActive
  await prisma.userProfile.update({
    where: { clerkId: userId },
    data: {
      streak,
      lastActive: now
    }
  });

  return { streak, streakBonus };
}

// Check if user completed daily goal
export async function checkDailyGoal(userId: string): Promise<{ completed: boolean; activitiesToday: number }> {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const activitiesToday = await prisma.progress.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });

  return {
    completed: activitiesToday >= 1, // Daily goal = 1 activity
    activitiesToday
  };
}

// Award XP and update level
export async function awardXP(userId: string, activityType: string, xpAmount?: number): Promise<{ newLevel: number; leveledUp: boolean }> {
  const xp = xpAmount || XP_VALUES[activityType as keyof typeof XP_VALUES] || 0;
  
  if (xp === 0) {
    return { newLevel: 1, leveledUp: false };
  }

  // Get current user
  const user = await prisma.userProfile.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const oldLevel = calculateLevel(user.xp);
  const newXP = user.xp + xp;
  const newLevel = calculateLevel(newXP);
  const leveledUp = newLevel > oldLevel;

  // Update user XP
  await prisma.userProfile.update({
    where: { clerkId: userId },
    data: { xp: newXP }
  });

  // Award level up badge if leveled up
  if (leveledUp) {
    const levelBadge = await prisma.badge.findFirst({
      where: {
        userId,
        name: `Level ${newLevel}`
      }
    });

    if (!levelBadge) {
      await prisma.badge.create({
        data: {
          userId,
          name: `Level ${newLevel}`,
          icon: '⭐',
          description: `Reached level ${newLevel}`,
          category: 'level'
        }
      });
    }
  }

  return { newLevel, leveledUp };
}

// Check for consistency streak badge
export async function checkConsistencyBadge(userId: string): Promise<void> {
  const user = await prisma.userProfile.findUnique({
    where: { clerkId: userId }
  });

  if (!user || user.streak < 7) {
    return;
  }

  // Check if user already has consistency badge
  const existingBadge = await prisma.badge.findFirst({
    where: {
      userId,
      name: 'Consistency King'
    }
  });

  if (!existingBadge) {
    await prisma.badge.create({
      data: {
        userId,
        name: 'Consistency King',
        icon: '👑',
        description: 'Maintained a 7-day learning streak',
        category: 'streak'
      }
    });
  }
}

// Get gamification stats for user
export async function getGamificationStats(userId: string) {
  const user = await prisma.userProfile.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const dailyGoal = await checkDailyGoal(userId);
  const xpProgress = getXPProgress(user.xp);
  const xpForNextLevel = getXPForNextLevel(user.xp);

  return {
    level: user.level,
    xp: user.xp,
    streak: user.streak,
    lastActive: user.lastActive,
    dailyGoal: dailyGoal.completed,
    activitiesToday: dailyGoal.activitiesToday,
    xpProgress,
    xpForNextLevel
  };
}
