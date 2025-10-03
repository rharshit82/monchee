// XP Rewards
export const XP_REWARDS = {
  "deep-dive": 20,
  "cheatsheet": 10,
  "quiz": 30,
  "lab": 50,
  "flashcard": 5,
  "library": 15,
  "scenario": 25,
};

// Level Thresholds
export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, name: "Novice" },
  { level: 2, xp: 101, name: "Apprentice" },
  { level: 3, xp: 301, name: "Practitioner" },
  { level: 4, xp: 601, name: "Expert" },
  { level: 5, xp: 1101, name: "Master" },
];

export function calculateXpAward(itemType: string): number {
  return XP_REWARDS[itemType as keyof typeof XP_REWARDS] || 0;
}

export function calculateLevelInfo(xp: number) {
  const currentLevel = Math.floor(xp / 100) + 1;
  const xpInCurrentLevel = xp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;
  const nextLevel = currentLevel + 1;
  
  return {
    currentLevel,
    xpInCurrentLevel,
    xpToNextLevel,
    nextLevel,
  };
}

export function getLevelName(level: number): string {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === level);
  return threshold?.name || "Unknown";
}

export function checkAndAwardBadges(userProfile: any): any[] {
  const newBadges = [];
  
  // Check for quiz completion badges
  const quizProgress = userProfile.progress.filter((p: any) => p.itemType === "quiz");
  if (quizProgress.length > 0) {
    const hasQuizBadge = userProfile.badges.some((b: any) => b.name === "Quiz Starter");
    if (!hasQuizBadge) {
      newBadges.push({
        name: "Quiz Starter",
        description: "Completed your first quiz",
        icon: "📝",
        category: "Milestone",
        condition: "quiz:first:complete",
      });
    }
  }
  
  // Check for lab completion badges
  const labProgress = userProfile.progress.filter((p: any) => p.itemType === "lab");
  if (labProgress.length > 0) {
    const hasLabBadge = userProfile.badges.some((b: any) => b.name === "Lab Explorer");
    if (!hasLabBadge) {
      newBadges.push({
        name: "Lab Explorer",
        description: "Completed your first lab",
        icon: "🔬",
        category: "Milestone",
        condition: "lab:first:complete",
      });
    }
  }
  
  // Check for level up badges
  if (userProfile.level >= 2) {
    const hasLevelBadge = userProfile.badges.some((b: any) => b.name === "Level Up!");
    if (!hasLevelBadge) {
      newBadges.push({
        name: "Level Up!",
        description: "Reached Level 2",
        icon: "⬆️",
        category: "Level",
        condition: "level:2:reach",
      });
    }
  }
  
  return newBadges;
}

// Additional exports for API compatibility
export async function awardXP(userId: string, activityType: string) {
  // Mock implementation - in real app, this would update database
  return {
    newLevel: 2,
    leveledUp: true,
    xpAwarded: XP_REWARDS[activityType as keyof typeof XP_REWARDS] || 0
  };
}

export async function updateStreak(userId: string) {
  // Mock implementation - in real app, this would update database
  return {
    streak: 7,
    streakBonus: 0
  };
}

export async function checkConsistencyBadge(userId: string) {
  // Mock implementation
  return null;
}

export async function checkForNewBadges(userId: string) {
  // Mock implementation
  return [];
}

export async function getGamificationStats(userId: string) {
  // Mock implementation
  return {
    xp: 1250,
    level: 5,
    streak: 7,
    badges: 3
  };
}

export async function processActivity(userId: string, activityType: string, data: any) {
  // Mock implementation
  return {
    success: true,
    xpAwarded: XP_REWARDS[activityType as keyof typeof XP_REWARDS] || 0
  };
}

export function calculateXPReward(activityType: string): number {
  return calculateXpAward(activityType);
}
