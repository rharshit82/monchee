import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { handleApiError, validateRequired, sanitizeInput } from '@/lib/error-handler';
import { rateLimit, addSecurityHeaders, validateRequestSize } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = rateLimit({ maxRequests: 60, windowMs: 15 * 60 * 1000 })(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Validate request size
    if (!validateRequestSize(request, 1024)) {
      return NextResponse.json(
        { success: false, error: 'Request too large', code: 'REQUEST_TOO_LARGE' },
        { status: 413 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const ref = searchParams.get('ref');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Cap at 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);

    // Validate and sanitize inputs
    if (type && !['all', 'deep-dive', 'lab', 'cheatsheet', 'library'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid type parameter', code: 'INVALID_TYPE' },
        { status: 400 }
      );
    }

    if (ref) {
      const sanitizedRef = sanitizeInput(ref);
      if (sanitizedRef !== ref) {
        return NextResponse.json(
          { success: false, error: 'Invalid reference parameter', code: 'INVALID_REF' },
          { status: 400 }
        );
      }
    }

    // Build where clause
    const where: any = {};
    if (type !== 'all') {
      where.type = type;
    }
    if (ref) {
      where.ref = sanitizeInput(ref);
    }

    // Get comments with user data
    const comments = await prisma.comment.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    });

    // Transform data for frontend
    const transformedComments = comments.map(comment => ({
      id: comment.id,
      user: {
        username: comment.user.username,
        displayName: comment.user.username,
        avatarUrl: comment.user.avatarUrl
      },
      type: comment.type,
      ref: comment.ref,
      content: comment.content,
      likes: comment.likes || 0,
      replies: 0, // TODO: Implement replies
      createdAt: comment.createdAt.toISOString()
    }));

    const response = NextResponse.json({
      success: true,
      comments: transformedComments,
      total: comments.length,
      hasMore: comments.length === limit
    });

    return addSecurityHeaders(response);

  } catch (error) {
    return handleApiError(error);
  }
}
