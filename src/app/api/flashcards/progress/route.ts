import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { setId, cardId, known } = body;

    if (!setId || !cardId || known === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, you would save this to a database
    console.log(`Flashcard progress: Set ${setId}, Card ${cardId}, Known: ${known} by user ${userId}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Flashcard progress saved'
    });

  } catch (error) {
    console.error('Error saving flashcard progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
