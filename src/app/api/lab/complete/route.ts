import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { awardXP, updateStreak, checkConsistencyBadge } from '@/lib/gamification';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing required field: slug' }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check if lab already completed
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: userProfile.id,
        type: 'lab',
        ref: slug
      }
    });

    if (existingProgress) {
      return NextResponse.json({ 
        success: true, 
        points: 0,
        xp: 0,
        message: 'Lab already completed!',
        alreadyCompleted: true
      });
    }

    // Create new progress record
    await prisma.progress.create({
      data: {
        userId: userProfile.id,
        type: 'lab',
        ref: slug,
        status: 'completed',
        points: 20,
        xp: 100
      }
    });

    // Update user points
    await prisma.userProfile.update({
      where: { id: userProfile.id },
      data: {
        points: {
          increment: 20
        }
      }
    });

    // Award XP and check for level up
    const { newLevel, leveledUp } = await awardXP(userId, 'lab');
    
    // Update user level if leveled up
    if (leveledUp) {
      await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: { level: newLevel }
      });
    }

    // Update streak
    const { streak, streakBonus } = await updateStreak(userId);
    
    // Check for consistency badge
    await checkConsistencyBadge(userId);

    // Award badges based on lab completion
    const badgesToAward = [];

    // Lab-specific badges
    if (slug === 'rate-limiter') {
      const trafficControllerBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Traffic Controller'
        }
      });

      if (!trafficControllerBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Traffic Controller',
          icon: '🚦',
          description: 'Completed rate limiter lab',
          category: 'lab'
        });
      }
    }

    if (slug === 'url-shortener') {
      const urlMasterBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'URL Master'
        }
      });

      if (!urlMasterBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'URL Master',
          icon: '🔗',
          description: 'Completed URL shortener lab',
          category: 'lab'
        });
      }
    }

    if (slug === 'message-queue') {
      const queueMasterBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Queue Master'
        }
      });

      if (!queueMasterBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Queue Master',
          icon: '📨',
          description: 'Completed message queue lab',
          category: 'lab'
        });
      }
    }

    // General lab completion badge
    const labExplorerBadge = await prisma.badge.findFirst({
      where: {
        userId: userProfile.id,
        name: 'Lab Explorer'
      }
    });

    if (!labExplorerBadge) {
      badgesToAward.push({
        userId: userProfile.id,
        name: 'Lab Explorer',
        icon: '🔬',
        description: 'Completed your first lab',
        category: 'achievement'
      });
    }

    // Award badges
    if (badgesToAward.length > 0) {
      await prisma.badge.createMany({
        data: badgesToAward
      });
    }

    // Check for milestone badges
    const totalProgress = await prisma.progress.count({
      where: {
        userId: userProfile.id,
        status: 'completed'
      }
    });

    // First activity badge
    if (totalProgress === 1) {
      const firstStepsBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'First Steps'
        }
      });

      if (!firstStepsBadge) {
        await prisma.badge.create({
          data: {
            userId: userProfile.id,
            name: 'First Steps',
            icon: '👶',
            description: 'Completed your first activity',
            category: 'milestone'
          }
        });
      }
    }

    // Dedicated learner badge (10+ activities)
    if (totalProgress === 10) {
      const dedicatedLearnerBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Dedicated Learner'
        }
      });

      if (!dedicatedLearnerBadge) {
        await prisma.badge.create({
          data: {
            userId: userProfile.id,
            name: 'Dedicated Learner',
            icon: '📚',
            description: 'Completed 10+ activities',
            category: 'milestone'
          }
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      points: 20,
      xp: 100,
      badgesAwarded: badgesToAward.length,
      streakBonus,
      message: `Lab completed! +20 points, +100 XP added to your profile.`
    });

  } catch (error) {
    console.error('Error completing lab:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
