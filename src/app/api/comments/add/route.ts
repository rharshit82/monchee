import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, ref, content } = body;

    if (!type || !ref || !content) {
      return NextResponse.json({ 
        error: 'Missing required fields: type, ref, content' 
      }, { status: 400 });
    }

    if (!['lab', 'deep-dive'].includes(type)) {
      return NextResponse.json({ 
        error: 'Invalid type. Must be lab or deep-dive' 
      }, { status: 400 });
    }

    if (content.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Comment content cannot be empty' 
      }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Create new comment
    const comment = await prisma.comment.create({
      data: {
        userId: userProfile.id,
        type,
        ref,
        content: content.trim()
      },
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true
          }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      comment,
      message: 'Comment posted successfully'
    });

  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
