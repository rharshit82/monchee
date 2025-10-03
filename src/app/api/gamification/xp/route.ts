import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { processActivity, calculateXPReward } from '@/lib/gamification';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { activity } = body;

    if (!activity) {
      return NextResponse.json({ error: 'Activity is required' }, { status: 400 });
    }

    // Calculate XP reward
    const xpEarned = calculateXPReward(activity);

    // In a real app, this would:
    // 1. Fetch current user progress from database
    // 2. Process the activity and update progress
    // 3. Check for new badges
    // 4. Update database with new progress and badges

    console.log(`User ${userId} earned ${xpEarned} XP for ${activity.type}: ${activity.ref}`);

    return NextResponse.json({ 
      success: true, 
      xpEarned,
      message: `Earned ${xpEarned} XP!`
    });

  } catch (error) {
    console.error('Error processing XP:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
