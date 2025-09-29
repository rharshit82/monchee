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

    // Check if deep dive already completed
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: userProfile.id,
        type: 'deep-dive',
        ref: slug
      }
    });

    if (existingProgress) {
      return NextResponse.json({ 
        success: true, 
        points: 0,
        xp: 0,
        message: 'Deep dive already completed!',
        alreadyCompleted: true
      });
    }

    // Create new progress record
    await prisma.progress.create({
      data: {
        userId: userProfile.id,
        type: 'deep-dive',
        ref: slug,
        status: 'completed',
        points: 5,
        xp: 25
      }
    });

    // Update user points
    await prisma.userProfile.update({
      where: { id: userProfile.id },
      data: {
        points: {
          increment: 5
        }
      }
    });

    // Award XP and check for level up
    const { newLevel, leveledUp } = await awardXP(userId, 'deep-dive');
    
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

    // Award badges based on deep dive completion
    const badgesToAward = [];

    // Deep dive-specific badges
    if (slug === 'instagram-feed') {
      const socialMediaExpertBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Social Media Expert'
        }
      });

      if (!socialMediaExpertBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Social Media Expert',
          icon: '📸',
          description: 'Completed Instagram feed deep dive',
          category: 'deep-dive'
        });
      }
    }

    if (slug === 'uber-dispatch') {
      const logisticsExpertBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Logistics Expert'
        }
      });

      if (!logisticsExpertBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Logistics Expert',
          icon: '🚗',
          description: 'Completed Uber dispatch deep dive',
          category: 'deep-dive'
        });
      }
    }

    if (slug === 'netflix-streaming') {
      const streamingExpertBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Streaming Expert'
        }
      });

      if (!streamingExpertBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Streaming Expert',
          icon: '🎬',
          description: 'Completed Netflix streaming deep dive',
          category: 'deep-dive'
        });
      }
    }

    // General deep dive completion badge
    const deepThinkerBadge = await prisma.badge.findFirst({
      where: {
        userId: userProfile.id,
        name: 'Deep Thinker'
      }
    });

    if (!deepThinkerBadge) {
      badgesToAward.push({
        userId: userProfile.id,
        name: 'Deep Thinker',
        icon: '🧠',
        description: 'Completed your first deep dive',
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

    // Architect badge (3+ deep dives)
    const deepDiveCount = await prisma.progress.count({
      where: {
        userId: userProfile.id,
        type: 'deep-dive',
        status: 'completed'
      }
    });

    if (deepDiveCount === 3) {
      const architectBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Architect'
        }
      });

      if (!architectBadge) {
        await prisma.badge.create({
          data: {
            userId: userProfile.id,
            name: 'Architect',
            icon: '🏗️',
            description: 'Completed 3+ deep dives',
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
      points: 5,
      xp: 25,
      badgesAwarded: badgesToAward.length,
      streakBonus,
      message: `Deep dive completed! +5 points, +25 XP added to your profile.`
    });

  } catch (error) {
    console.error('Error completing deep dive:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
