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

    if (!['lab', 'deep-dive', 'cheatsheet'].includes(type)) {
      return NextResponse.json({ 
        error: 'Invalid type. Must be lab, deep-dive, or cheatsheet' 
      }, { status: 400 });
    }

    // Find user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId }
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check if note already exists for this content
    const existingNote = await prisma.note.findFirst({
      where: {
        userId: userProfile.id,
        type,
        ref
      }
    });

    if (existingNote) {
      // Update existing note
      const updatedNote = await prisma.note.update({
        where: { id: existingNote.id },
        data: { content, updatedAt: new Date() }
      });

      return NextResponse.json({ 
        success: true, 
        note: updatedNote,
        message: 'Note updated successfully'
      });
    }

    // Create new note
    const note = await prisma.note.create({
      data: {
        userId: userProfile.id,
        type,
        ref,
        content
      }
    });

    return NextResponse.json({ 
      success: true, 
      note,
      message: 'Note created successfully'
    });

  } catch (error) {
    console.error('Error creating/updating note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
