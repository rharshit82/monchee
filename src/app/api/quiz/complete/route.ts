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
    const { slug, score, total } = body;

    if (!slug || score === undefined || total === undefined) {
      return NextResponse.json({ error: 'Missing required fields: slug, score, total' }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Calculate percentage score
    const percentage = Math.round((score / total) * 100);

    // Check if quiz already completed
    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: userProfile.id,
        type: 'quiz',
        ref: slug
      }
    });

    if (existingProgress) {
      // Update existing progress
      await prisma.progress.update({
        where: { id: existingProgress.id },
        data: {
          score: percentage,
          points: 10, // Fixed 10 points per quiz
          xp: 50, // 50 XP per quiz
          updatedAt: new Date()
        }
      });
    } else {
      // Create new progress record
      await prisma.progress.create({
        data: {
          userId: userProfile.id,
          type: 'quiz',
          ref: slug,
          status: 'completed',
          score: percentage,
          points: 10,
          xp: 50
        }
      });

      // Update user points
      await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: {
          points: {
            increment: 10
          }
        }
      });

      // Award XP and check for level up
      const { newLevel, leveledUp } = await awardXP(userId, 'quiz');
      
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
    }

    // Award badges based on quiz completion
    const badgesToAward = [];

    // Perfect score badge
    if (percentage === 100) {
      const perfectBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Perfect Score'
        }
      });

      if (!perfectBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Perfect Score',
          icon: '🎯',
          description: 'Scored 100% on a quiz',
          category: 'achievement'
        });
      }
    }

    // Quiz master badge (90%+)
    if (percentage >= 90) {
      const quizMasterBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Quiz Master'
        }
      });

      if (!quizMasterBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Quiz Master',
          icon: '🧠',
          description: 'Scored 90%+ on a quiz',
          category: 'achievement'
        });
      }
    }

    // Quiz-specific badges
    if (slug === 'caching-basics' && percentage >= 90) {
      const cacheMasterBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Cache Master'
        }
      });

      if (!cacheMasterBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Cache Master',
          icon: '🔥',
          description: 'Expert in caching strategies',
          category: 'special'
        });
      }
    }

    if (slug === 'sharding-basics' && percentage >= 90) {
      const shardingProBadge = await prisma.badge.findFirst({
        where: {
          userId: userProfile.id,
          name: 'Sharding Pro'
        }
      });

      if (!shardingProBadge) {
        badgesToAward.push({
          userId: userProfile.id,
          name: 'Sharding Pro',
          icon: '🗂️',
          description: 'Expert in database sharding',
          category: 'special'
        });
      }
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
      points: 10,
      xp: 50,
      percentage,
      badgesAwarded: badgesToAward.length,
      streakBonus: existingProgress ? false : streakBonus,
      message: `Quiz completed! +10 points, +50 XP added to your profile.`
    });

  } catch (error) {
    console.error('Error completing quiz:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
