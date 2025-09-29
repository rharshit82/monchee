import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { noteId, content } = body;

    if (!noteId || !content) {
      return NextResponse.json({ 
        error: 'Missing required fields: noteId, content' 
      }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Find the note and verify ownership
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userId: userProfile.id
      }
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Update the note
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { content, updatedAt: new Date() }
    });

    return NextResponse.json({ 
      success: true, 
      note: updatedNote,
      message: 'Note updated successfully'
    });

  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
