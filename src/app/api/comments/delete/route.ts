import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { commentId } = body;

    if (!commentId) {
      return NextResponse.json({ 
        error: 'Missing required field: commentId' 
      }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Find the comment and verify ownership
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        userId: userProfile.id
      }
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found or you do not have permission to delete it' }, { status: 404 });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId }
    });

    return NextResponse.json({ 
      success: true,
      message: 'Comment deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
