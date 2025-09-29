import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const ref = searchParams.get('ref');

    if (!type || !ref) {
      return NextResponse.json({ 
        error: 'Missing required parameters: type, ref' 
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

    // Fetch notes for the specific content
    const notes = await prisma.note.findMany({
      where: {
        userId: userProfile.id,
        type,
        ref
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      notes
    });

  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
