import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { scenarioId, selectedOption, isCorrect } = body;

    if (!scenarioId || !selectedOption || isCorrect === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate points (5 points per scenario)
    const points = 5;
    
    // In a real application, you would save this to a database
    console.log(`Scenario completed: ${scenarioId} by user ${userId} - Selected: ${selectedOption}, Correct: ${isCorrect} (${points} points)`);

    return NextResponse.json({ 
      success: true, 
      message: 'Scenario progress saved',
      points
    });

  } catch (error) {
    console.error('Error completing scenario:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
