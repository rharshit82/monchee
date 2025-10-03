import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, score, total } = body;

    if (!slug || score === undefined || !total) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate points (10 points per correct answer)
    const points = score * 10;
    
    // In a real application, you would save this to a database
    console.log(`Quiz completed: ${slug} by user ${userId} - Score: ${score}/${total} (${points} points)`);

    return NextResponse.json({ 
      success: true, 
      message: 'Quiz progress saved',
      points,
      badgesAwarded: 0 // Could implement badge logic here
    });

  } catch (error) {
    console.error('Error completing quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
