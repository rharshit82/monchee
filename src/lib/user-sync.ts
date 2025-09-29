import { prisma } from './db';
import { extractSocialUserData } from './social-auth';

export async function syncUserWithDatabase(user: any) {
  try {
    const socialData = extractSocialUserData(user);
    
    // Check if user already exists
    const existingUser = await prisma.userProfile.findUnique({
      where: { clerkId: user.id }
    });

    if (existingUser) {
      // Update existing user with latest info
      return await prisma.userProfile.update({
        where: { clerkId: user.id },
        data: {
          username: socialData.username,
          avatarUrl: socialData.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
          email: socialData.email,
          provider: socialData.provider,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user
      const newUser = await prisma.userProfile.create({
        data: {
          clerkId: user.id,
          username: socialData.username,
          avatarUrl: socialData.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
          email: socialData.email,
          provider: socialData.provider,
          bio: `Welcome to Monchee! I'm learning system design.`,
          points: 0
        }
      });

      // Add welcome badge
      await prisma.badge.create({
        data: {
          userId: newUser.id,
          name: "Welcome!",
          icon: "🎉",
          description: "Joined Monchee",
          category: "milestone"
        }
      });

      return newUser;
    }
  } catch (error) {
    console.error('Error syncing user with database:', error);
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  return await prisma.userProfile.findUnique({
    where: { username },
    include: {
      badges: {
        orderBy: { createdAt: 'desc' }
      },
      progress: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });
}

export async function getUserByClerkId(clerkId: string) {
  return await prisma.userProfile.findUnique({
    where: { clerkId },
    include: {
      badges: {
        orderBy: { createdAt: 'desc' }
      },
      progress: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  });
}

export async function getLeaderboard(limit: number = 10) {
  return await prisma.userProfile.findMany({
    orderBy: { points: 'desc' },
    take: limit,
    include: {
      badges: {
        take: 3,
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: {
          progress: {
            where: { status: 'completed' }
          }
        }
      }
    }
  });
}

export async function addProgress(
  clerkId: string,
  type: string,
  ref: string,
  status: string = 'completed',
  score?: number,
  points?: number
) {
  const user = await prisma.userProfile.findUnique({
    where: { clerkId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if progress already exists
  const existingProgress = await prisma.progress.findFirst({
    where: {
      userId: user.id,
      type,
      ref
    }
  });

  if (existingProgress) {
    // Update existing progress
    return await prisma.progress.update({
      where: { id: existingProgress.id },
      data: {
        status,
        score,
        points,
        updatedAt: new Date()
      }
    });
  } else {
    // Create new progress
    const progress = await prisma.progress.create({
      data: {
        userId: user.id,
        type,
        ref,
        status,
        score,
        points
      }
    });

    // Update user points
    if (points) {
      await prisma.userProfile.update({
        where: { id: user.id },
        data: {
          points: {
            increment: points
          }
        }
      });
    }

    return progress;
  }
}

export async function addBadge(clerkId: string, name: string, icon?: string, description?: string, category?: string) {
  const user = await prisma.userProfile.findUnique({
    where: { clerkId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if badge already exists
  const existingBadge = await prisma.badge.findFirst({
    where: {
      userId: user.id,
      name
    }
  });

  if (existingBadge) {
    return existingBadge;
  }

  return await prisma.badge.create({
    data: {
      userId: user.id,
      name,
      icon,
      description,
      category
    }
  });
}
