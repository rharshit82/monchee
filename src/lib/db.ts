import prisma from './prisma';
export { default as prisma } from './prisma';
export async function getUserProfileByClerkId(clerkId: string) {
  return await prisma.userProfile.findUnique({
    where: { clerkId }
  });
}

export async function getUserProfileByUsername(username: string) {
  return await prisma.userProfile.findUnique({
    where: { username }
  });
}

export async function createUserProfile(data: {
  clerkId: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
}) {
  return await prisma.userProfile.create({
    data
  });
}

export async function updateUserProfilePoints(userId: string, points: number) {
  return await prisma.userProfile.update({
    where: { id: userId },
    data: { points }
  });
}

export async function addProgress(data: {
  userId: string;
  type: string;
  ref: string;
  status: string;
  score?: number;
  points?: number;
}) {
  return await prisma.progress.create({
    data
  });
}

export async function getUserProgress(userId: string) {
  return await prisma.progress.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function addBadge(data: {
  userId: string;
  name: string;
  icon?: string;
  description?: string;
  category?: string;
}) {
  return await prisma.badge.create({
    data
  });
}

export async function getUserBadges(userId: string) {
  return await prisma.badge.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getAllUserProfiles() {
  return await prisma.userProfile.findMany({
    orderBy: { points: 'desc' },
    include: {
      badges: true,
      progress: true
    }
  });
}

export async function getProgressByType(userId: string, type: string) {
  return await prisma.progress.findMany({
    where: { 
      userId,
      type 
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProgressStats(userId: string) {
  const total = await prisma.progress.count({
    where: { userId, status: 'completed' }
  });

  const byType = await prisma.progress.groupBy({
    by: ['type'],
    where: { userId, status: 'completed' },
    _count: { type: true }
  });

  return {
    total,
    byType: byType.reduce((acc, item) => {
      acc[item.type] = item._count.type;
      return acc;
    }, {} as Record<string, number>)
  };
}
