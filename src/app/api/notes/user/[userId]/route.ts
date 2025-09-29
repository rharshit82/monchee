import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
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

    // Fetch all notes for the user
    const notes = await prisma.note.findMany({
      where: {
        userId: userProfile.id
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
    console.error('Error fetching user notes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
