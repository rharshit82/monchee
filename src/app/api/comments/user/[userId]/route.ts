import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ 
        error: 'Missing userId parameter' 
      }, { status: 400 });
    }

    // Find user profile by ID
    const userProfile = await prisma.userProfile.findUnique({
      where: { id: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all comments for the user
    const comments = await prisma.comment.findMany({
      where: {
        userId: userProfile.id
      },
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
      }
    });

    return NextResponse.json({ 
      success: true, 
      comments
    });

  } catch (error) {
    console.error('Error fetching user comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
