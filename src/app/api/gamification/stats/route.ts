import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { handleApiError, AppError } from '@/lib/error-handler';
import { rateLimit, addSecurityHeaders, validateRequestSize } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = rateLimit({ maxRequests: 30, windowMs: 15 * 60 * 1000 })(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Validate request size
    if (!validateRequestSize(request, 1024)) {
      return NextResponse.json(
        { success: false, error: 'Request too large', code: 'REQUEST_TOO_LARGE' },
        { status: 413 }
      );
    }

    const { userId } = await auth();
    
    if (!userId) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    // Get user profile with all related data
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
      include: {
        progress: true,
        badges: true,
        notes: true,
        comments: true
      }
    });

    if (!userProfile) {
      throw new AppError('User profile not found', 404, 'PROFILE_NOT_FOUND');
    }

    // Calculate additional stats
    const totalActivities = userProfile.progress.length;
    const completedActivities = userProfile.progress.filter(p => p.status === 'completed').length;
    const totalXP = userProfile.xp;
    const currentLevel = userProfile.level;
    const currentStreak = userProfile.streak;
    const totalBadges = userProfile.badges.length;
    const totalNotes = userProfile.notes.length;
    const totalComments = userProfile.comments.length;

    // Calculate level progress
    const xpInCurrentLevel = totalXP % 100;
    const xpToNextLevel = 100 - xpInCurrentLevel;
    const nextLevel = currentLevel + 1;

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentActivity = userProfile.progress.filter(
      p => p.createdAt && new Date(p.createdAt) >= sevenDaysAgo
    ).length;

    // Get activity breakdown by type
    const activityBreakdown = userProfile.progress.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get badge breakdown by category
    const badgeBreakdown = userProfile.badges.reduce((acc, b) => {
      const category = b.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      // Basic stats
      xp: totalXP,
      level: currentLevel,
      streak: currentStreak,
      points: userProfile.points,
      badges: totalBadges,
      
      // Level progress
      levelProgress: {
        current: xpInCurrentLevel,
        total: 100,
        nextLevel,
        xpToNextLevel
      },
      
      // Activity stats
      activities: {
        total: totalActivities,
        completed: completedActivities,
        recent: recentActivity
      },
      
      // Content stats
      content: {
        notes: totalNotes,
        comments: totalComments
      },
      
      // Breakdowns
      activityBreakdown,
      badgeBreakdown,
      
      // Profile info
      profile: {
        username: userProfile.username,
        displayName: userProfile.username, // Use username as displayName
        avatarUrl: userProfile.avatarUrl,
        bio: userProfile.bio,
        joinedAt: userProfile.joinedAt
      }
    };

    const response = NextResponse.json({
      success: true,
      stats
    });

    return addSecurityHeaders(response);

  } catch (error) {
    return handleApiError(error);
  }
}
