import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    // Fetch latest comments across all resources
    const comments = await prisma.comment.findMany({
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
      take: limit
    });

    return NextResponse.json({ 
      success: true, 
      comments
    });

  } catch (error) {
    console.error('Error fetching latest comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
