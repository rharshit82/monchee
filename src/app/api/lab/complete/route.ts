import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { labId, completedAt } = body;

    if (!labId) {
      return NextResponse.json({ error: 'Lab ID is required' }, { status: 400 });
    }

    // In a real application, you would save this to a database
    // For now, we'll just return a success response
    console.log(`Lab completed: ${labId} by user ${userId} at ${completedAt}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Lab marked as complete',
      labId,
      completedAt 
    });

  } catch (error) {
    console.error('Error completing lab:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
