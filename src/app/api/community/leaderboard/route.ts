import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { handleApiError, validateRequired } from '@/lib/error-handler';
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

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Cap at 100
    const sortBy = searchParams.get('sortBy') || 'xp';

    // Validate sortBy parameter
    const validSortFields = ['xp', 'level', 'streak', 'points'];
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json(
        { success: false, error: 'Invalid sort field', code: 'INVALID_SORT_FIELD' },
        { status: 400 }
      );
    }

    // Get all user profiles with their progress and badges
    const users = await prisma.userProfile.findMany({
      include: {
        progress: true,
        badges: true,
      },
      orderBy: {
        [sortBy]: 'desc'
      },
      take: limit
    });

    // Transform data for leaderboard
    const leaderboard = users.map((user, index) => ({
      id: user.id,
      username: user.username,
      displayName: user.username, // Use username as displayName since displayName field doesn't exist
      avatarUrl: user.avatarUrl,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      points: user.points,
      badges: user.badges.length,
      rank: index + 1,
      lastActive: user.lastActive,
      joinedAt: user.joinedAt
    }));

    const response = NextResponse.json({
      success: true,
      leaderboard,
      total: users.length,
      sortBy
    });

    return addSecurityHeaders(response);

  } catch (error) {
    return handleApiError(error);
  }
}
